export type TBlockConstructor = new (props: Record<string, unknown>) => IBlock;

type TypedObject<T> = T extends Record<infer K, unknown>
  ? { [key in K]: unknown }
  : unknown;

export interface IBlock {
  dispatchDidMount: () => void;
  dispatchDidUpdate: () => void;
  dispatchWillUnmount: () => void;
  didMount: () => void;
  didUpdate: () => void;
  willUnmount: () => void;
  getContent: () => HTMLElement;
  setProps: (props: Partial<TypedObject<unknown>>) => void;
}

export interface IAppRouter {
  start: () => void;
  base: (path: string) => void;
  go: (path: string, replace: boolean) => void;
  back: () => void;
  forward: () => void;
  use: (path: string, view: TBlockConstructor) => void;
  authUse: (
    path: string,
    view: TBlockConstructor,
    stub: TBlockConstructor,
    redirectCb: () => void
  ) => void;
  notAuthUse: (
    path: string,
    view: TBlockConstructor,
    stub: TBlockConstructor,
    redirectCb: () => void
  ) => void;
}

export interface IRoute {
  match: (path: string) => boolean;
  render: (path: string) => void;
  update: (path: string) => void;
  leave: () => void;
}

export interface IStore {
  start: (state: Record<string, unknown>) => IStore;
  on: (fn: (state: Record<string, unknown>) => void) => IStore;
  set: (path: string, value: unknown) => IStore;
  getState: () => Record<string, unknown>;
}

export interface IBaseAPI {
  create: () => Promise<unknown>;
  request: () => Promise<unknown>;
  update: () => Promise<unknown>;
  delete: () => Promise<unknown>;
}
