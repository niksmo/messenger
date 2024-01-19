import { Store } from 'shared/components/store/store';
import { ROUTE_PATH } from 'shared/constants/routes';
import { AppRouter } from 'shared/components/router/router';
import type { TChatListState } from 'entites/chat/model/chat-list.model';
import type { TChatUsersSate } from 'entites/chat-user/model/chat-user.model';
import type { TDeleteUsersState } from '../model/chat-users-delete.model';
import { ChatUsersDeleteAPI } from '../api/chat-users-delete.api';
import { chatUsersController } from 'entites/chat-user/controller/chat-users.controller';
import { chatListController } from 'entites/chat/controller/chat-list.controller';

const STORE_SLICE = 'deleteUsers';
const STORE_LOAD = STORE_SLICE + '.load';

export class DeleteChatUsersController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatUsersDeleteAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  private async _start(): Promise<void> {
    await chatUsersController.getChatUsers();

    const { chatUsers } = this._store.getState<TChatUsersSate>();

    const initState: Record<string, unknown> = {
      select: [],
      load: false,
    };

    if (chatUsers) {
      initState.users = Object.values(chatUsers);
    } else {
      initState.users = [];
    }

    this._store.set(STORE_SLICE, initState);
  }

  private _resetState(): void {
    this._store.set(STORE_SLICE, {
      users: [],
      select: [],
      load: false,
    });
  }

  private async _deleteChatUsers(): Promise<void> {
    const { deleteUsers, chatList } = this._store.getState<
      TDeleteUsersState & TChatListState
    >();

    const { select } = deleteUsers;
    const currentChat =
      chatList.currentChat ?? chatListController.getCurChatIdInLocal();

    if (!select.length || !currentChat) {
      return;
    }

    this._store.set(STORE_LOAD, true);

    try {
      const xhr = await this._api.delete({
        users: select,
        chatId: currentChat,
      });

      const { status, response } = xhr;

      if (status === 200) {
        this._store.getState<TChatUsersSate>().chatUsers = {};
        this._router.go(ROUTE_PATH.MAIN);
        this._resetState();
        return;
      }

      if (status === 400) {
        console.warn(response);
      }

      if (status === 401) {
        this._router.go(ROUTE_PATH.MAIN);
        this._resetState();
        return;
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }

  private _select(userId: number): void {
    const { deleteUsers } = this._store.getState<TDeleteUsersState>();
    const { select } = deleteUsers;
    select.push(userId);
  }

  private _unselect(userId: number): void {
    const { deleteUsers } = this._store.getState<TDeleteUsersState>();
    const { select } = deleteUsers;

    deleteUsers.select = select.filter(
      (selectedUserId) => selectedUserId !== userId
    );
  }

  public start(): void {
    this._store.set(STORE_SLICE, { users: [], select: [], load: false });
    void this._start();
  }

  public select(e: Event): void {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { checked, value } = target;
      if (checked) {
        this._select(parseInt(value));
      } else {
        this._unselect(parseInt(value));
      }
    }
  }

  public deleteChatUsers(): void {
    void this._deleteChatUsers();
  }
}

const deleteChatUsersController = new DeleteChatUsersController();

export { deleteChatUsersController };
