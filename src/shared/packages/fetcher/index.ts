interface IFetcher {
  get(): void;
  post(): void;
  put(): void;
  delete(): void;
}

class Fetcher implements IFetcher {
  public get(): void {}
  public post(): void {}
  public put(): void {}
  public delete(): void {}
}

export { Fetcher };
export type { IFetcher };
