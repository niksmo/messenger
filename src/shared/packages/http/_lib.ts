import { isObject } from '../../helpers/is.ts';

const HTTP = 'http:';
const HTTPS = 'https:';

const EMPTY_STR = '';

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

export function normalizeURL(origin: string): string {
  const { href, protocol } = new URL(origin);

  if (!isSupportScheme(protocol)) {
    throw TypeError(`Unsupport protocol: ${protocol}. Retype on "http(s)"`);
  }

  return href;
}

export function getHref(baseURL: string | null, pathOrURL: string): string {
  if (URL.canParse(pathOrURL)) {
    const url = pathOrURL;
    return normalizeURL(url);
  }

  if (!baseURL) {
    throw TypeError('Set baseURL or pass it in request');
  }

  const path = pathOrURL;

  const { href } = new URL(baseURL + path);
  return href;
}

export function serializeToSearch(body: unknown): string {
  if (!isObject(body)) {
    throw new Error('The "body" must be an object');
  }

  const entries = Object.entries(body);

  if (entries.length === 0) {
    return EMPTY_STR;
  }

  const searchEntries = entries.map(([param, value]) => {
    if (typeof value !== 'string') {
      throw new Error('The "body" must be an Record<string,string>');
    }

    return [encodeURIComponent(param), encodeURIComponent(value)].join('=');
  });

  const searchParams = '?' + searchEntries.join('&');
  return searchParams;
}

export function setRequestHeader(
  xhr: XMLHttpRequest,
  header: Record<string, string>
): XMLHttpRequest {
  Object.entries(header).forEach(([param, value]) => {
    xhr.setRequestHeader(param, value);
  });
  return xhr;
}
