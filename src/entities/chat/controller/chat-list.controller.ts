import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ChatListAPI } from '../api/chat-list.api';
import {
  CHAT_LIST_ACTIVE,
  type TChat,
  type TChatListState,
} from '../model/chat-list.model';
import { STORAGE_KEY } from 'shared/constants/storage';
import { chatController } from './chat.controller';

const STORE_SLICE = 'chatList';
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

  private _defineActive(chatId?: number): void {
    const { load, chats, active } =
      this._store.getState<TChatListState>().chatList;

    let activeChat: TChat | undefined;

    if (chatId) {
      activeChat = chats.find((chatData) => chatData.id === chatId);
    } else {
      if (!load || !active) {
        return;
      }
      activeChat = chats.find((chatData) => chatData.id === active.id);
    }

    if (!activeChat) {
      this._store.set(CHAT_LIST_ACTIVE, null);
      localStorage.removeItem(STORAGE_KEY.ACTIVE_CHAT);
      return;
    }

    const { last_message: _, ...activeMeta } = activeChat;

    this._store.set(CHAT_LIST_ACTIVE, activeMeta);
    localStorage.setItem(STORAGE_KEY.ACTIVE_CHAT, JSON.stringify(activeMeta));
  }

  private async _start(): Promise<void> {
    const { load } = this._store.getState<TChatListState>().chatList;

    if (!load) {
      return;
    }

    await this._requestChats();
  }

  private async _requestChats(): Promise<void> {
    try {
      const { status, response } = await this._api.request();

      if (status === 200 && typeof response === 'string') {
        const chats: TChat[] = JSON.parse(response);
        this._store.set(STORE_SLICE, { chats });
        this._defineActive();
        this._store.set(STORE_LOAD, false);
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
    }
  }

  public start(): void {
    void this._start();
  }

  public openChat(chatId: number): void {
    const { active } = this._store.getState<TChatListState>().chatList;

    if (active?.id === chatId) {
      return;
    }

    this._defineActive(chatId);
    chatController.open(chatId);
  }
}

const chatListController = new ChatListController();

export { chatListController };
