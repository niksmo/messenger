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
  TChatState,
  TReceivedData,
} from '../model/chat.model';

const PING_INTERVAL_30S = 30_000;
const DISCONNECT_INTERVAL_500MS = 500;

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

    const { viewer } = this._store.getState<TViewerState>();

    this._ws = new WebSocket(BASE_WS + `/${viewer.id}/${chatId}/${token}`);

    let interval: NodeJS.Timeout;

    this._ws.onopen = (e) => {
      this._store.set(CHAT_LOAD, false);

      //delete
      console.log('on_open', e);

      interval = setInterval(() => {
        if (this._ws?.readyState !== 1) {
          return;
        }

        //delete
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

      //delete
      console.log('on_close', e);
    };

    this._ws.onmessage = (e) => {
      //delete
      console.log('on_message', e);

      const { data: received } = e;

      if (typeof received !== 'string') {
        return;
      }

      const data: TReceivedData = JSON.parse(received);

      if (Array.isArray(data)) {
        //handle old messages
        //concat arrays
      } else {
        const { type } = data;

        if (type !== 'message') {
          return;
        }

        debugger;

        const { conversation } = this._store.getState<TChatState>().chat;
        conversation.push(data);
        this._store.set(CHAT_CONVERSATION, conversation);
      }
    };
  }

  //for delete chat feature
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
