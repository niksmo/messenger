import { Store } from 'shared/components/store';
import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { goToLoginWithUnauth } from 'shared/helpers';
import { ChatListAPI } from '../api/chat-list.api';

const STORE_SLICE = 'chatList';
const STORE_CHATS = STORE_SLICE + '.chats';
const STORE_CURRENT_CHAT = STORE_SLICE + '.currentChat';
const STORE_LOAD = STORE_SLICE + '.load';

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
    this._store.set(STORE_CHATS, []);
  }

  private async _fetchChats(): Promise<void> {
    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request();
      const { status, response } = xhr;

      if (status === 200 && typeof response === 'string') {
        const chats = JSON.parse(response);
        this._store.set(STORE_CHATS, chats);
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
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }

  start(): void {
    this._initState();
    void this._fetchChats();
  }

  openChat(chatId: string): void {
    const chatIdNum = Number(chatId) || null;
    this._store.set(STORE_CURRENT_CHAT, chatIdNum);
  }
}

const chatListController = new ChatListController();

export { chatListController };
