import { Store } from 'shared/components/store';
import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { goToLoginWithUnauth, reviveNullToString } from 'shared/helpers';
import { ChatListAPI } from '../api/chat-list.api';
import { type TChatListState } from '../model/chat-list.model';

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

  private _initState(chatId: string | null | number): void {
    const { chatList } = this._store.getState<TChatListState>();
    const { chats, currentChat } = { ...chatList };

    if (!chats) {
      this._store.set(STORE_CHATS, []);
    }

    if (currentChat) {
      this._router.go(ROUTE_PATH.MAIN + '/' + currentChat);
      return;
    }

    chatId = Number(chatId) || null;

    if (chatId) {
      this._router.go(ROUTE_PATH.MAIN + '/' + chatId);
      return;
    }

    this._store.set(STORE_CURRENT_CHAT, null);
  }

  async requestChats(): Promise<void> {
    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request();
      const { status, response } = xhr;

      if (status === 200 && typeof response === 'string') {
        const chats = JSON.parse(response, reviveNullToString);
        this._store.set(STORE_CHATS, chats);
        return;
      }

      if (status === 401) {
        goToLoginWithUnauth();
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

  start(chatId: string): void {
    this._initState(chatId);
  }

  openChat(chatId: string): void {
    const chatIdNum = Number(chatId) || null;
    this._store.set(STORE_CURRENT_CHAT, chatIdNum);
  }
}

const chatListController = new ChatListController();

export { chatListController };
