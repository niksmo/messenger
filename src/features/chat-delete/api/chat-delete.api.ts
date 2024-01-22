import { BaseAPI } from 'shared/components/base-api/base-api';
import { BASE_URL, HEADER } from 'shared/constants/api';
import HttpTransport, { type XHR } from 'shared/packages/http/http';

export class DeleteChatAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();
    this._http = new HttpTransport()
      .setBaseURL(BASE_URL)
      .setHeader(HEADER.JSON);
  }

  async delete(chatId: number): XHR {
    return await this._http.delete(JSON.stringify({ chatId }));
  }
}
