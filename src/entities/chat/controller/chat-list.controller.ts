import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ChatListAPI } from '../api/chat-list.api';

const STORE_SLICE = 'chatList';
const STORE_CURRENT_CHAT = STORE_SLICE + '.currentChat';
const STORE_LOAD = STORE_SLICE + '.load';
const STORAGE_CURRENT_CHAT_KEY = 'currentChat';

export class ChatListController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatListAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  public getCurChatIdInLocal(): number | null {
    const posibleStringId = localStorage.getItem(STORAGE_CURRENT_CHAT_KEY);
    if (posibleStringId === null) {
      return posibleStringId;
    }
    const posibleChatId = parseInt(posibleStringId);
    if (isNaN(posibleChatId)) {
      return null;
    }
    const chatId = posibleChatId;
    return chatId;
  }

  private async _start(): Promise<void> {
    const currentChat = this.getCurChatIdInLocal();
    this._store.set(STORE_CURRENT_CHAT, currentChat);
    await this._requestChats();
  }

  private async _requestChats(): Promise<void> {
    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request();
      const { status, response } = xhr;

      if (status === 200 && typeof response === 'string') {
        const chats = JSON.parse(response);
        this._store.set(STORE_SLICE, { chats });
        return;
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
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

  public start(): void {
    void this._start();
  }

  public openChat(chatId: number): void {
    const currentChat = this.getCurChatIdInLocal();

    if (!currentChat || chatId !== currentChat) {
      this._store.set(STORE_CURRENT_CHAT, chatId);
      localStorage.setItem(STORAGE_CURRENT_CHAT_KEY, String(chatId));
    }
  }
}

const chatListController = new ChatListController();

export { chatListController };
