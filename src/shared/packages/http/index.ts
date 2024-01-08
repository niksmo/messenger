import {
  METHOD,
  getHref,
  normalizeURL,
  serializeToJSON,
  serializeToSearch,
} from './lib';

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
) => Promise<XMLHttpRequest>;

interface IHttpTransportAgent {
  get: TRequest;
  post: TRequest;
  put: TRequest;
  delete: TRequest;
}

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

  private async _request<T>(
    method: METHOD,
    pathOrURL: string,
    body?: T,
    rHeader: Record<string, string> = this._header,
    rTimeout: number = this._timeout
  ): Promise<XMLHttpRequest> {
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

  public async get<T>(
    pathOrURL: string,
    body?: T,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<XMLHttpRequest> {
    return await this._request<T>(METHOD.GET, pathOrURL, body, header, timeout);
  }

  public async post<T>(
    pathOrURL: string,
    body?: T,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<XMLHttpRequest> {
    return await this._request<T>(
      METHOD.POST,
      pathOrURL,
      body,
      header,
      timeout
    );
  }

  public async put<T>(
    pathOrURL: string,
    body?: T,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<XMLHttpRequest> {
    return await this._request<T>(METHOD.PUT, pathOrURL, body, header, timeout);
  }

  public async delete<T>(
    pathOrURL: string,
    body?: T,
    header?: Record<string, string>,
    timeout?: number
  ): Promise<XMLHttpRequest> {
    return await this._request<T>(
      METHOD.DELETE,
      pathOrURL,
      body,
      header,
      timeout
    );
  }
}

export default HttpTransport;
