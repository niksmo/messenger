import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { BASE_WS } from 'shared/constants/api';
import {
  VIWER_AUTH,
  type TViewerState,
} from 'entites/viewer/model/viewer.model';
import type { TMessage } from 'entites/message/model/message.model';
import { ChatAPI } from '../api/chat.api';
import { type TChatListState } from '../model/chat-list.model';
import {
  CHAT_CONVERSATION,
  CHAT_LOAD,
  type TChatState,
} from '../model/chat.model';

const PING_INTERVAL_30S = 30_000;
const DISCONNECT_INTERVAL_500MS = 500;
const OLD_MESSAGES_INCREMENT = 20;

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
    this._store.set(CHAT_LOAD, true);
    void this._open(chatId);
  }

  private async _open(chatId: number): Promise<void> {
    const token = await this._requestToken(chatId);

    if (!token) {
      return;
    }

    await this._connect(chatId, token);

    const { load } = this._store.getState<TChatState>().chat;

    if (load) {
      await this._fetchOldMessages();
    }

    this._subscribe(chatId);
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

  private async _fetchOldMessages(): Promise<MessageEvent> {
    let counter = 0;
    this._ws?.send(JSON.stringify({ type: 'get old', content: counter }));

    return await new Promise<MessageEvent>((resolve, reject) => {
      if (!this._ws) {
        return;
      }

      let oldMessages: TMessage[] = [];

      this._ws.onmessage = (e) => {
        const { data: received } = e;

        if (typeof received !== 'string') {
          return;
        }

        try {
          const data: TMessage[] = JSON.parse(received);

          if (!Array.isArray(data)) {
            throw TypeError('not messages array');
          }

          oldMessages = oldMessages.concat(data);

          if (data.length < 20) {
            const { chats, active } =
              this._store.getState<TChatListState>().chatList;

            if (active) {
              const selectedChat = chats.find(
                (chatData) => chatData.id === active.id
              );

              if (selectedChat) {
                selectedChat.unread_count = 0;
                active.unread_count = 0;
              }
            }

            this._store.set('chat', {
              conversation: oldMessages.reverse(),
              load: false,
            });
            resolve(e);
            return;
          }

          counter += OLD_MESSAGES_INCREMENT;
          this._ws?.send(JSON.stringify({ type: 'get old', content: counter }));
        } catch (err) {
          console.warn(err);
          reject(e);
        }
      };
    });
  }

  private async _connect(chatId: number, token: string): Promise<Event> {
    return await new Promise<Event>((resolve, reject) => {
      if (this._ws) {
        this.disconnect();
      }

      const { viewer } = this._store.getState<TViewerState & TChatListState>();

      this._ws = new WebSocket(BASE_WS + `/${viewer.id}/${chatId}/${token}`);

      this._ws.onopen = (e) => {
        resolve(e);
      };

      this._ws.onerror = (e) => {
        reject(e);
      };
    });
  }

  private _subscribe(chatId: number): void {
    if (!this._ws) {
      return;
    }

    const interval = setInterval(() => {
      this._ws?.send(JSON.stringify({ type: 'ping' }));
    }, PING_INTERVAL_30S);

    this._ws.onmessage = (e) => {
      const { data: received } = e;

      if (typeof received !== 'string') {
        return;
      }

      try {
        const data: TMessage = JSON.parse(received);

        const { conversation } = this._store.getState<TChatState>().chat;

        if (data.type !== 'message') {
          return;
        }

        conversation.push(data);
        this._store.set(CHAT_CONVERSATION, conversation);
      } catch (err) {
        console.warn(err);
      }
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
  }

  public disconnect(): void {
    if (this._ws?.bufferedAmount) {
      setTimeout(this.disconnect.bind(this), DISCONNECT_INTERVAL_500MS);
    } else {
      this._ws?.close();
      this._ws = null;
      this._store.set(CHAT_CONVERSATION, []);
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
