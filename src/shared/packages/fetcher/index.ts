interface IFetcherConfig {
  setBaseURL(baseURL: string): IFetcherConfig;
  setTimeout(intMs: number): IFetcherConfig;
  setHeader(header: Record<string, string>): IFetcherConfig;
}

interface IFetcherRequest {
  get(): void;
  post(): void;
  put(): void;
  delete(): void;
}

if (XMLHttpRequest) {
  throw ReferenceError(
    'Fetcher pkg work only in browsers and includes XMLHttRequest under hood'
  );
}

class Fetcher implements IFetcherConfig, IFetcherRequest {
  private _timeout = 1000;
  constructor() {}

  public setBaseURL(baseURL: string): Fetcher {
    return this;
  }

  public setTimeout(intInMs: number): Fetcher {
    return this;
  }

  public setHeader(header: Record<string, string>): Fetcher {
    return this;
  }

  public get<T>(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }
  public post<T>(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }
  public put<T>(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }
  public delete<T>(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }
}

export default Fetcher;
