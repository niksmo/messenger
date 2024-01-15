import { Store } from 'shared/components/store';
import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { goToLoginWithUnauth } from 'shared/helpers';
import { ChatListAPI } from '../api/chat-list.api';
import type { IChatListState } from '../model/chat-list.model';

const STORE_SLICE = 'chatList';

export class ChatListController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatListAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  private _initState(): void {
    const initState: IChatListState = {
      selected: null,
      chats: [],
    };
    this._store.set(STORE_SLICE, initState);
  }

  private async _fetchChats(): Promise<void> {
    try {
      const xhr = await this._api.request();
      const { status, response } = xhr;

      if (status === 200 && typeof response === 'string') {
        const chats = JSON.parse(response);
        this._store.set(STORE_SLICE, chats);
        return;
      }

      if (status === 401) {
        goToLoginWithUnauth();
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }

      this._initState();
    } catch (err) {
      console.warn(err);
    }
  }

  start(): void {
    this._initState();
    void this._fetchChats();
  }
}

const chatListController = new ChatListController();

export { chatListController };
