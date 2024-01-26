import {
  METHOD,
  getHref,
  normalizeURL,
  serializeToSearch,
  setRequestHeader,
} from './_lib.ts';

if (!XMLHttpRequest) {
  throw ReferenceError(
    'HttpTransport work only in browsers and includes XMLHttpRequest under hood'
  );
}

interface IHttpTransportConfig {
  setBaseURL: (baseURL: string) => IHttpTransportConfig;
  setTimeout: (intMs: number) => IHttpTransportConfig;
  setHeader: (header: Record<string, string>) => IHttpTransportConfig;
}

type TRequest<T = undefined> = (
  pathOrURL: string,
  body: T,
  header?: Record<string, string>,
  timeout?: number
) => XHR;

interface IHttpTransportAgent {
  get: TRequest;
  post: TRequest;
  put: TRequest;
  delete: TRequest;
}

export type XHR = Promise<XMLHttpRequest>;

class HttpTransport implements IHttpTransportConfig, IHttpTransportAgent {
  private _baseURL: null | string = null;
  private _timeout = 1000;
  private _header: Record<string, string> = {};

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

  private async _request(
    method: METHOD,
    pathOrURL: string,
    body: XMLHttpRequestBodyInit | null = null,
    rHeader: Record<string, string> = {},
    rTimeout: number = this._timeout
  ): XHR {
    return await new Promise((resolve, reject) => {
      let reqURL = getHref(this._baseURL, pathOrURL);

      if (method === METHOD.GET && typeof body === 'string') {
        reqURL += body;
      }

      const xhr = new XMLHttpRequest();
      xhr.timeout = rTimeout;
      xhr.open(method, reqURL, true);
      xhr.withCredentials = true;

      setRequestHeader(xhr, Object.assign(this._header, rHeader));

      xhr.send(body);

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
  ): XHR {
    const reqBody = serializeToSearch(body);
    return await this._request(METHOD.GET, pathOrURL, reqBody, header, timeout);
  }

  public async post(
    pathOrURL: string,
    body?: XMLHttpRequestBodyInit,
    header?: Record<string, string>,
    timeout?: number
  ): XHR {
    return await this._request(METHOD.POST, pathOrURL, body, header, timeout);
  }

  public async put(
    pathOrURL: string,
    body?: XMLHttpRequestBodyInit,
    header?: Record<string, string>,
    timeout?: number
  ): XHR {
    return await this._request(METHOD.PUT, pathOrURL, body, header, timeout);
  }

  public async delete(
    pathOrURL: string,
    body?: XMLHttpRequestBodyInit,
    header?: Record<string, string>,
    timeout?: number
  ): XHR {
    return await this._request(METHOD.DELETE, pathOrURL, body, header, timeout);
  }
}

export default HttpTransport;
