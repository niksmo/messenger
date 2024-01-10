import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL } from 'shared/constants/api';
import HttpTransport from 'shared/packages/http';

type IRequestProps = Record<string, string>;

export class SigninAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();
    this._http = new HttpTransport().setBaseURL(BASE_URL + '/auth').setHeader({
      'Content-type': 'application/json',
    });
  }

  async request(props: IRequestProps): Promise<XMLHttpRequest> {
    return await this._http.post('/signin', props);
  }
}
