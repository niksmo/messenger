import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL } from 'shared/constants/api';
import HttpTransport from 'shared/packages/http';

interface IRequestProps {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export class SignupAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();

    this._http = new HttpTransport().setBaseURL(BASE_URL + '/auth');
  }

  async request(props: IRequestProps): Promise<XMLHttpRequest> {
    return await this._http.post('/signup', props);
  }
}
