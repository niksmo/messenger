import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL } from 'shared/constants/api';
import HttpTransport from 'shared/packages/http';

export class ViewerAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();
    this._http = new HttpTransport().setBaseURL(BASE_URL + '/auth');
  }

  async request(): Promise<XMLHttpRequest> {
    return await this._http.get('/user');
  }
}
