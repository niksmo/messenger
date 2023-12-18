import Fetcher from 'shared/packages/fetcher';
import TokenService from '../token-service';
import {
  type TChangePasswordFormData,
  type TEditProfileFormData,
  type TSigninFormData,
  type TSignupFormData,
} from './model';

export type TAPIRequest = (
  pathOrURL: string,
  body?: Record<string, string>,
  header?: Record<string, string>,
  timeout?: number
) => Promise<unknown>;

interface IAPIFetcher {
  get: TAPIRequest;
  post: TAPIRequest;
  put: TAPIRequest;
  delete: TAPIRequest;
}

interface IAPITokenService {
  setToken: (token: string) => void;
  getToken: () => string;
}

interface IAPIService {
  registerFetcher: (fetcher: IAPIFetcher) => this;
  registerTokenService: (tokenSevice: IAPITokenService) => this;
}

class APIService implements IAPIService {
  private _fetcher: IAPIFetcher | null = null;
  private _tokenService: IAPITokenService | null = null;

  public registerFetcher(fetcher: IAPIFetcher): this {
    this._fetcher = fetcher;
    return this;
  }

  public registerTokenService(tokenSevice: IAPITokenService): this {
    this._tokenService = tokenSevice;
    return this;
  }

  private checkSourses(): [IAPIFetcher, IAPITokenService] {
    if (!this._fetcher || !this._tokenService) {
      throw Error('Fetcher or token-service are unregistered');
    }
    return [this._fetcher, this._tokenService];
  }

  public async signin(formData: TSigninFormData): Promise<unknown> {
    const [fetcher] = this.checkSourses();
    return await fetcher.post(
      '/signin',
      formData as unknown as Record<string, string>,
      { 'X-Debugg': 'mode/debugg' },
      2000
    );
  }

  public async signup(formData: TSignupFormData): Promise<unknown> {
    const [fetcher] = this.checkSourses();
    return await fetcher.post(
      '/signup',
      formData as unknown as Record<string, string>,
      { 'X-Debugg': 'mode/debugg' },
      2000
    );
  }

  public async editProfile(formData: TEditProfileFormData): Promise<unknown> {
    const [fetcher] = this.checkSourses();
    return await fetcher.post(
      '/profile/edit-profile',
      formData as unknown as Record<string, string>,
      { 'X-Debugg': 'mode/debugg' },
      2000
    );
  }

  public async changePassword(
    formData: TChangePasswordFormData
  ): Promise<unknown> {
    const [fetcher] = this.checkSourses();
    return await fetcher.post(
      '/profile/change-password',
      formData as unknown as Record<string, string>,
      { 'X-Debugg': 'mode/debugg' },
      2000
    );
  }
}

const API = new APIService();

API.registerFetcher(new Fetcher().setMode('dev')).registerTokenService(
  new TokenService()
);

export { API };
