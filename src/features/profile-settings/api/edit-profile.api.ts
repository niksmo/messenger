import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL, HEADER } from 'shared/constants/api';
import HttpTransport, { type XHR } from 'shared/packages/http';

export class EditProfileAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();

    this._http = new HttpTransport()
      .setBaseURL(BASE_URL + '/user')
      .setHeader(HEADER.JSON);
  }

  async update(data: Record<string, string>): XHR {
    return await this._http.put('/profile', JSON.stringify(data));
  }
}
