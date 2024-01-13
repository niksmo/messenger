import { BaseAPI } from 'shared/components/base-api';
import { BASE_URL, HEADER } from 'shared/constants/api';
import HttpTransport from 'shared/packages/http';

export class ChangePasswordAPI extends BaseAPI {
  private readonly _http;

  constructor() {
    super();

    this._http = new HttpTransport()
      .setBaseURL(BASE_URL + '/user')
      .setHeader(HEADER.JSON);
  }

  async update(body: {
    oldPassword: string;
    newPassword: string;
  }): Promise<XMLHttpRequest> {
    return await this._http.put('/password', JSON.stringify(body));
  }
}
