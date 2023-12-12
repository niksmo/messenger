interface IAPIFetcher {}

interface IAPITokenService {}

interface IAPIService {
  registerFetcher(fetcher: IAPIFetcher): void;
  registerTokenService(tokenSevice: IAPITokenService): void;
}

class APIService implements IAPIService {
  private _fetcher: IAPIFetcher | null = null;
  private _tokenService: IAPITokenService | null = null;

  public registerFetcher(fetcher: IAPIFetcher): void {
    this._fetcher = fetcher;
  }
  public registerTokenService(tokenSevice: IAPITokenService): void {
    this._tokenService = tokenSevice;
  }
  public get(arg: unknown) {
    return Promise.resolve();
  }

  public post(arg: unknown) {
    return Promise.resolve();
  }

  public put(arg: unknown) {
    return Promise.resolve();
  }

  public delete(arg: unknown) {
    return Promise.resolve();
  }
}

const API = new APIService();

export { API };
