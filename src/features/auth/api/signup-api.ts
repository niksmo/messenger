import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL } from 'shared/constants/api';
import HttpTransport from 'shared/packages/http';

export class SignupAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();

    this._http = new HttpTransport().setBaseURL(BASE_URL + '/auth').setHeader({
      'Content-type': 'application/json',
    });
  }

  async request(props: Record<string, string>): Promise<XMLHttpRequest> {
    return await this._http.post('/signup', props);
  }
}
