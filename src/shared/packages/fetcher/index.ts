import {
  METHOD,
  getHref,
  normalizeURL,
  serializeToJSON,
  serializeToSearch,
} from './lib';

if (!XMLHttpRequest) {
  throw ReferenceError(
    'Fetcher work only in browsers and includes XMLHttRequest under hood'
  );
}

type TMode = 'prod' | 'dev';

interface IFetcherConfig {
  setBaseURL(baseURL: string): IFetcherConfig;
  setTimeout(intMs: number): IFetcherConfig;
  setHeader(header: Record<string, string>): IFetcherConfig;
  setMode(mode: TMode): void;
}

type TRequest = (
  pathOrURL: string,
  body?: Record<string, string>,
  header?: Record<string, string>,
  timeout?: number
) => Promise<XMLHttpRequest> | Promise<unknown>;

interface IFetcherRequest {
  get: TRequest;
  post: TRequest;
  put: TRequest;
  delete: TRequest;
}

class Fetcher implements IFetcherConfig, IFetcherRequest {
  private _baseURL: null | string = null;
  private _timeout = 1000;
  private _header: Record<string, string> = {};
  private _mode: TMode = 'dev';
  constructor() {}

  setMode(newMode: TMode) {
    this._mode = newMode;
    return this;
  }

  public setBaseURL(baseURL: string): Fetcher {
    this._baseURL = normalizeURL(baseURL);
    return this;
  }

  public setTimeout(intInMs: number): Fetcher {
    this._timeout = intInMs;
    return this;
  }

  public setHeader(header: Record<string, string>): Fetcher {
    this._header = header;
    return this;
  }

  private _debugg(
    method: METHOD,
    pathOrURL: string,
    body: Record<string, string> = {},
    rHeader: Record<string, string> = this._header,
    rTimeout: number = this._timeout
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        function rollTheDice(
          resolve: (v: unknown) => void,
          reject: () => void
        ) {
          if (Math.floor(Math.random() * 100) < 40) {
            return reject;
          }
          return resolve;
        }

        const resolveOrReject = rollTheDice(resolve, reject);

        resolveOrReject({
          request: body,
          response:
            method === METHOD.GET
              ? serializeToSearch(body)
              : serializeToJSON(body),
          href: pathOrURL,
          options: { header: rHeader, timeout: rTimeout },
        });
      }, 1000);
    });
  }

  private _request(
    method: METHOD,
    pathOrURL: string,
    body: Record<string, string> = {},
    rHeader: Record<string, string> = this._header,
    rTimeout: number = this._timeout
  ) {
    if (this._mode === 'dev') {
      return this._debugg(method, pathOrURL, body, rHeader, rTimeout);
    }
    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const url = getHref(this._baseURL, pathOrURL);
      const rURL = METHOD.GET ? url + serializeToSearch(body) : url;
      const rBody = METHOD.GET ? null : serializeToJSON(body);

      const xhr = new XMLHttpRequest();
      xhr.timeout = rTimeout;
      xhr.open(method, rURL);

      const headerEntries = Object.entries(rHeader);
      headerEntries.forEach(([p, v]) => {
        xhr.setRequestHeader(p, v);
      });

      xhr.send(rBody);

      const xhrResolve = (_e: ProgressEvent<XMLHttpRequestEventTarget>) =>
        resolve(xhr);

      const xhrReject = (_e: ProgressEvent<XMLHttpRequestEventTarget>) =>
        reject(xhr);

      xhr.addEventListener('load', xhrResolve);
      xhr.addEventListener('abort', xhrReject);
      xhr.addEventListener('error', xhrReject);
    });
  }

  public get(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ) {
    return this._request(METHOD.GET, pathOrURL, body, header, timeout);
  }

  public post(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ) {
    return this._request(METHOD.POST, pathOrURL, body, header, timeout);
  }
  public put(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ) {
    return this._request(METHOD.PUT, pathOrURL, body, header, timeout);
  }
  public delete(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ) {
    return this._request(METHOD.DELETE, pathOrURL, body, header, timeout);
  }
}

export default Fetcher;
