import { BaseAPI } from 'shared/components/base-api/base-api';
import { BASE_URL, HEADER } from 'shared/constants/api';
import HttpTransport, { type XHR } from 'shared/packages/http/http';

interface IEditChatUsersBody {
  users: number[];
  chatId: number;
}

export class ChatUsersAddAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();
    this._http = new HttpTransport()
      .setBaseURL(BASE_URL)
      .setHeader(HEADER.JSON);
  }

  async request(reqBody: Record<string, string>): XHR {
    return await this._http.post('/user/search', JSON.stringify(reqBody));
  }

  async create(reqBody: IEditChatUsersBody): XHR {
    return await this._http.put('/chats/users', JSON.stringify(reqBody));
  }
}
