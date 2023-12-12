import {
  METHOD,
  getHref,
  normalizeURL,
  serializeToJSON,
  serializeToSearch,
} from './lib';

interface IFetcherConfig {
  setBaseURL(baseURL: string): IFetcherConfig;
  setTimeout(intMs: number): IFetcherConfig;
  setHeader(header: Record<string, string>): IFetcherConfig;
}

type TRequest = (
  pathOrURL: string,
  body?: Record<string, string>,
  header?: Record<string, string>,
  timeout?: number
) => Promise<XMLHttpRequest>;

interface IFetcherRequest {
  get: TRequest;
  post: TRequest;
  put: TRequest;
  delete: TRequest;
}

if (XMLHttpRequest) {
  throw ReferenceError(
    'Fetcher work only in browsers and includes XMLHttRequest under hood'
  );
}

class Fetcher implements IFetcherConfig, IFetcherRequest {
  private _baseURL: null | string = null;
  private _timeout = 1000;
  private _header: Record<string, string> = {};
  constructor() {}

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

  private _request(
    method: METHOD,
    pathOrURL: string,
    body: Record<string, string> = {},
    rHeader: Record<string, string> = this._header,
    rTimeout: number = this._timeout
  ) {
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
