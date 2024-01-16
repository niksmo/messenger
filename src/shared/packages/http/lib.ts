import { isObject } from 'shared/helpers';

const HTTP = 'http:';
const HTTPS = 'https:';

export const enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const SCHEMES = [HTTP, HTTPS];

function isSupportScheme(scheme: string): boolean {
  return SCHEMES.some((supScheme) => supScheme === scheme);
}

export function normalizeURL(origin: string): string | null {
  let result = null;

  try {
    const { href, protocol } = new URL(origin);

    if (!isSupportScheme(protocol)) {
      throw TypeError(
        `Fetcher. Unsupport protocol: ${protocol}. Retype on "http(s)"`
      );
    }

    result = href;
  } catch (err) {
    if (err instanceof Error) {
      console.warn(err);
    }
  }

  return result;
}

export function getHref(baseURL: string | null, path: string): string {
  if (baseURL) {
    const { href } = new URL(baseURL + path);

    return href;
  }

  const probHref = normalizeURL(path);

  if (!probHref) {
    throw TypeError(`Invalid origin. BaseURL: ${baseURL} | Path: ${path}.`);
  }

  const href = probHref;

  return href;
}

function inspectBody(body: unknown): never | object {
  if (!isObject(body)) {
    throw new Error('The "body" must be an object');
  }
  return body;
}

export function serializeToSearch(body: unknown): string {
  const EMPTY_STR = '';
  if (!body) {
    return EMPTY_STR;
  }

  inspectBody(body);

  const entries = Object.entries(body);

  if (entries.length === 0) {
    return EMPTY_STR;
  }

  const searchEntries = entries.map((entry) => entry.join('='));
  const searchParams = ['?', ...searchEntries.join('&')].join('');
  return searchParams;
}

export function setRequestHeader(
  xhr: XMLHttpRequest,
  header: Record<string, string>
): XMLHttpRequest {
  Object.entries(header).forEach(([p, v]) => {
    xhr.setRequestHeader(p, v);
  });
  return xhr;
}
