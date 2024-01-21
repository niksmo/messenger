import { BaseAPI } from 'shared/components/base-api/base-api';
import { BASE_URL } from 'shared/constants/api';
import HttpTransport, { type XHR } from 'shared/packages/http/http';

export class ChatUsersAPI extends BaseAPI {
  private readonly _http;
  constructor() {
    super();

    this._http = new HttpTransport().setBaseURL(BASE_URL + '/chats');
  }

  async request(chatId: string): XHR {
    return await this._http.get('/' + chatId + '/users');
  }
}
