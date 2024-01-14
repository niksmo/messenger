import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL } from 'shared/constants/api';
import HttpTransport from 'shared/packages/http';

export class ChangeAvatarAPI extends BaseAPI {
  private readonly _http;
  constructor() {
    super();

    this._http = new HttpTransport().setBaseURL(BASE_URL + '/user');
  }

  async update(formData: FormData): Promise<XMLHttpRequest> {
    return await this._http.put('/profile/avatar', formData);
  }
}
