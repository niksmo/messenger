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
  setBaseURL: (baseURL: string) => IFetcherConfig;
  setTimeout: (intMs: number) => IFetcherConfig;
  setHeader: (header: Record<string, string>) => IFetcherConfig;
  setMode: (mode: TMode) => void;
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

  setMode(newMode: TMode): this {
    this._mode = newMode;
    return this;
  }

  public setBaseURL(baseURL: string): this {
    this._baseURL = normalizeURL(baseURL);
    return this;
  }

  public setTimeout(intInMs: number): this {
    this._timeout = intInMs;
    return this;
  }

  public setHeader(header: Record<string, string>): this {
    this._header = header;
    return this;
  }

  private async _debugg(
    method: METHOD,
    pathOrURL: string,
    body: Record<string, string> = {},
    rHeader: Record<string, string> = this._header,
    rTimeout: number = this._timeout
  ): Promise<unknown> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        function rollTheDice2(): boolean {
          return Math.floor(Math.random() * 100) < 40;
        }

        const resolveOrReject = rollTheDice2() ? resolve : reject;

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

  private async _request(
    method: METHOD,
    pathOrURL: string,
    body: Record<string, string> = {},
    rHeader: Record<string, string> = this._header,
    rTimeout: number = this._timeout
  ): Promise<unknown> {
    if (this._mode === 'dev') {
      return await this._debugg(method, pathOrURL, body, rHeader, rTimeout);
    }
    return await new Promise<XMLHttpRequest>((resolve, reject) => {
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

      const xhrResolve = (
        _e: ProgressEvent<XMLHttpRequestEventTarget>
      ): void => {
        resolve(xhr);
      };

      const xhrReject = (
        _e: ProgressEvent<XMLHttpRequestEventTarget>
      ): void => {
        reject(xhr);
      };

      xhr.addEventListener('load', xhrResolve);
      xhr.addEventListener('abort', xhrReject);
      xhr.addEventListener('error', xhrReject);
    });
  }

  public async get(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<unknown> {
    return await this._request(METHOD.GET, pathOrURL, body, header, timeout);
  }

  public async post(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<unknown> {
    return await this._request(METHOD.POST, pathOrURL, body, header, timeout);
  }

  public async put(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<unknown> {
    return await this._request(METHOD.PUT, pathOrURL, body, header, timeout);
  }

  public async delete(
    pathOrURL: string,
    body?: Record<string, string>,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<unknown> {
    return await this._request(METHOD.DELETE, pathOrURL, body, header, timeout);
  }
}

export default Fetcher;
