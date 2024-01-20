import { Store } from 'shared/components/store/store';
import { ChatAPI } from '../api/chat.api';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';

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
    //get chat id in local storage
    //if chat id null > return
    //else
    //get viewer id
    void this._open(viewerId, chatId);
  }

  public open(chatId: number): void {
    //set load = true
    //get viewer id
    void this._open(viewerId, chatId);
  }

  private async _open(viewerId: number, chatId: number): Promise<void> {
    //requestToken
    const token = await this._requestToken(chatId);

    if (!token) {
      return;
    }

    this.disconnect();

    //connect
    this._connect(viewerId, chatId, token);
  }

  private async _requestToken(chatId: number): Promise<string | undefined> {
    try {
      //post request
      const { status, response } = await this._api.request(chatId);
      if (status === 200 && typeof response === 'string') {
        //save token in store
        //return token;
        return 'token-1234';
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  private _connect(viewerId: number, chatId: number, token: string): void {
    this._ws = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${viewerId}/${chatId}/${token}`
    );

    //add listeners, especially onmessage should set data in store
    //add send ping on interval but need test memory lack when switch on another chat
  }

  public disconnect(): void {
    if (!this._ws) {
      return;
    }

    if (this._ws.bufferedAmount) {
      //wait bufferedAmount
      setTimeout(this.disconnect.bind(this), DISCONNECT_INTERVAL_500MS);
    } else {
      this._ws.close();
      this._ws = null;
    }
  }

  public send(data: string) {
    if (!this._ws) {
      return;
    }

    this._ws.send(JSON.stringify(data));
  }
}
