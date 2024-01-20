import { AppRouter } from 'shared/components/router/router';
import { Store } from 'shared/components/store/store';
import { ROUTE_PATH } from 'shared/constants/routes';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import type { TChatUsersIndexed, TUser } from '../model/chat-user.model';
import { ChatUsersAPI } from '../api/chat-users.api';

const STORE_SLICE = 'chatUsers';

export class ChatUsersController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatUsersAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  public start(): void {
    this._store.set(STORE_SLICE, {});
  }

  private _reset(): void {
    this.start();
  }

  private _makeIndex(usersList: TUser[]): TChatUsersIndexed {
    const chatUsersIndex: TChatUsersIndexed = {};

    usersList.reduce((map, user) => {
      const { id } = user;
      map[id] = user;
      return map;
    }, chatUsersIndex);

    return chatUsersIndex;
  }

  public async getChatUsers(): Promise<void> {
    const { active } = this._store.getState<TChatListState>().chatList;

    if (!active?.id) {
      return;
    }

    try {
      const xhr = await this._api.request(String(active.id));
      const { status, response } = xhr;

      if (status === 200) {
        if (typeof response === 'string') {
          const chatUsersList: TUser[] = JSON.parse(response);
          const chatUsersIndex = this._makeIndex(chatUsersList);

          this._store.set(STORE_SLICE, chatUsersIndex);
          return;
        }
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
      }

      if (status === 404) {
        this._router.go(ROUTE_PATH[404]);
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }

      this._reset();
    } catch (err) {
      console.warn(err);
    }
  }
}

const chatUsersController = new ChatUsersController();

export { chatUsersController };
