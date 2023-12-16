import Fetcher from 'shared/packages/fetcher';
import TokenService from '../token-service';
import {
  TEditProfileFormData,
  TSigninFormData,
  TSignupFormData,
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
  setToken(token: string): void;
  getToken(): string;
}

interface IAPIService {
  registerFetcher(fetcher: IAPIFetcher): this;
  registerTokenService(tokenSevice: IAPITokenService): this;
}

class APIService implements IAPIService {
  private _fetcher: IAPIFetcher | null = null;
  private _tokenService: IAPITokenService | null = null;

  public registerFetcher(fetcher: IAPIFetcher) {
    this._fetcher = fetcher;
    return this;
  }
  public registerTokenService(tokenSevice: IAPITokenService) {
    this._tokenService = tokenSevice;
    return this;
  }

  private checkSourses(): [IAPIFetcher, IAPITokenService] {
    if (!this._fetcher || !this._tokenService) {
      throw Error('Fetcher or token-service are unregistered');
    }
    return [this._fetcher, this._tokenService];
  }

  public signin(formData: TSigninFormData) {
    const [fetcher] = this.checkSourses();
    return fetcher.post(
      '/signin',
      formData,
      { 'X-Debugg': 'mode/debugg' },
      2000
    );
  }

  public signup(formData: TSignupFormData) {
    const [fetcher] = this.checkSourses();
    return fetcher.post(
      '/signup',
      formData,
      { 'X-Debugg': 'mode/debugg' },
      2000
    );
  }

  public editProfile(formData: TEditProfileFormData) {
    const [fetcher] = this.checkSourses();
    return fetcher.post(
      '/signup',
      formData,
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
