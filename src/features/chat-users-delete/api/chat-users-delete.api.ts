import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL, HEADER } from 'shared/constants/api';
import HttpTransport, { type XHR } from 'shared/packages/http';

interface IEditChatUsersBody {
  users: number[];
  chatId: number;
}

export class ChatUsersDeleteAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();
    this._http = new HttpTransport()
      .setBaseURL(BASE_URL + '/chats')
      .setHeader(HEADER.JSON);
  }

  async delete(reqBody: IEditChatUsersBody): XHR {
    return await this._http.delete('/users', JSON.stringify(reqBody));
  }
}
