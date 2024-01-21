import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { BASE_WS } from 'shared/constants/api';
import {
  VIWER_AUTH,
  type TViewerState,
} from 'entites/viewer/model/viewer.model';
import { ChatAPI } from '../api/chat.api';
import { type TChatListState } from '../model/chat-list.model';
import {
  CHAT_CONVERSATION,
  CHAT_LOAD,
  type TChatState,
  type TReceivedData,
} from '../model/chat.model';

const PING_INTERVAL_30S = 30_000;
const DISCONNECT_INTERVAL_500MS = 500;
const UNREAD_MESSAGES_INCREMENT = 20;

class ChatController {
  private readonly _store;
  private readonly _router;
  private readonly _api;
  private _ws: WebSocket | null = null;

  constructor() {
    this._store = Store.instance();
    this._router = AppRouter.instance();
    this._api = new ChatAPI();
  }

  public start(): void {
    const { chatList } = this._store.getState<TChatListState>();

    const { active } = chatList;
    if (!active) {
      this._store.set(CHAT_LOAD, false);
      return;
    }
    void this._open(active.id);
  }

  public open(chatId: number): void {
    void this._open(chatId);
  }

  private async _open(chatId: number): Promise<void> {
    this._store.set(CHAT_LOAD, true);

    const token = await this._requestToken(chatId);

    if (!token) {
      return;
    }

    this._connect(chatId, token);
  }

  private async _requestToken(chatId: number): Promise<string | undefined> {
    try {
      const { status, response } = await this._api.request(chatId);

      if (status === 200 && typeof response === 'string') {
        const { token }: { token: string } = JSON.parse(response);
        return token;
      }

      if (status === 401) {
        this._store.set(VIWER_AUTH, false);
        return;
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  private _connect(chatId: number, token: string): void {
    if (this._ws) {
      this.disconnect();
    }

    const { viewer, chatList } = this._store.getState<
      TViewerState & TChatListState
    >();

    this._ws = new WebSocket(BASE_WS + `/${viewer.id}/${chatId}/${token}`);

    let interval: NodeJS.Timeout;

    this._ws.onopen = () => {
      this._getUnreadMessages(chatList.active?.unread_count);

      this._store.set(CHAT_LOAD, false);

      interval = setInterval(() => {
        if (this._ws?.readyState !== 1) {
          return;
        }
        this._ws?.send(JSON.stringify({ type: 'ping' }));
      }, PING_INTERVAL_30S);
    };

    this._ws.onerror = () => {
      console.warn('WebSocket error');
    };

    this._ws.onclose = (e) => {
      clearInterval(interval);
      if (!e.wasClean) {
        void this._open(chatId);
      }
    };

    this._ws.onmessage = (e) => {
      const { data: received } = e;

      if (typeof received !== 'string') {
        return;
      }

      const data: TReceivedData = JSON.parse(received);

      let { conversation } = this._store.getState<TChatState>().chat;

      if (Array.isArray(data)) {
        conversation = conversation.concat(data);
      } else {
        if (data.type !== 'message') {
          return;
        }
        conversation.push(data);
      }

      this._store.set(CHAT_CONVERSATION, conversation);
    };
  }

  private _getUnreadMessages(unreadCount?: number): void {
    if (!unreadCount || !this._ws) {
      return;
    }

    let received = 0;

    while (received < unreadCount) {
      this._ws.send(JSON.stringify({ type: 'get old', content: received }));
      received += UNREAD_MESSAGES_INCREMENT;
    }
  }

  public disconnect(): void {
    if (this._ws?.bufferedAmount) {
      setTimeout(this.disconnect.bind(this), DISCONNECT_INTERVAL_500MS);
    } else {
      this._ws?.close();
      this._ws = null;
    }
  }

  public send(content: string): void {
    if (!this._ws) {
      return;
    }

    this._ws.send(JSON.stringify({ type: 'message', content }));
  }
}

const chatController = new ChatController();

export { chatController };
