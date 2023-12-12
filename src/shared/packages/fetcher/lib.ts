type TReqBody = Record<string, string>;

const HTTP = 'http';
const HTTPS = 'https';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const SCHEMES = [HTTP, HTTPS];

function isSupportScheme(scheme: string): boolean {
  return SCHEMES.some(supScheme => supScheme === scheme);
}

function isParams(possyblyParams: string): boolean {
  return SCHEMES.some(scheme => possyblyParams.startsWith(scheme));
}

function normalizeHost(host: string): string {
  const splitted = host.split('/').filter(s => s !== '');

  const [scheme, hostName] = splitted;

  if (!scheme || !hostName || !isSupportScheme(scheme)) {
    throw 'Incorrect host. Fetcher support only http(s) scheme.';
  }
  return scheme + '://' + hostName;
}

function serializeToSearch(body: TReqBody): string {
  const entries = Object.entries(body);

  if (entries.length === 0) {
    throw TypeError('Request body is empty');
  }

  const searchEntries = entries.map(entry => entry.join('='));
  const searchString = ['/?', ...searchEntries.join('&')].join('');
  return searchString;
}

function serializeToJSON(body: TReqBody): string {
  return JSON.stringify(body);
}

export { isParams, normalizeHost, serializeToSearch, serializeToJSON, METHOD };
