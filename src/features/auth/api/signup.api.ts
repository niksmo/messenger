import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL, HEADER } from 'shared/constants/api';
import HttpTransport, { type XHR } from 'shared/packages/http';

export class SignupAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();

    this._http = new HttpTransport()
      .setBaseURL(BASE_URL + '/auth')
      .setHeader(HEADER.JSON);
  }

  async create(props: Record<string, string>): XHR {
    return await this._http.post('/signup', JSON.stringify(props));
  }
}
