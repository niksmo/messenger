const HTTP = 'http';
const HTTPS = 'https';

const enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const SCHEMES = [HTTP, HTTPS];

function isSupportScheme(scheme: string): boolean {
  return SCHEMES.some(supScheme => supScheme === scheme);
}

function normalizeURL(origin: string): string | null {
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

function getHref(baseURL: string | null, path: string): string {
  if (baseURL) {
    const { href } = new URL(path, baseURL);

    return href;
  }

  const probHref = normalizeURL(path);

  if (!probHref) {
    throw TypeError(`Invalid origin. BaseURL: ${baseURL} | Path: ${path}.`);
  }

  const href = probHref;

  return href;
}

function serializeToSearch(body: Record<string, string>): string {
  const entries = Object.entries(body);

  if (entries.length === 0) {
    return '';
  }

  const searchEntries = entries.map(entry => entry.join('='));
  const searchString = ['?', ...searchEntries.join('&')].join('');
  return searchString;
}

function serializeToJSON(body: Record<string, string>): string {
  return JSON.stringify(body);
}

export { normalizeURL, getHref, serializeToSearch, serializeToJSON, METHOD };
