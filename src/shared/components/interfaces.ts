export type TBlockConstructor = new (props?: Record<string, unknown>) => IBlock;

export interface IBlock {
  dispatchDidMount: () => void;
  dispatchDidUpdate: () => void;
  dispatchWillUnmount: () => void;
  didMount: () => void;
  didUpdate: () => void;
  willUnmount: () => void;
  getContent: () => HTMLElement;
  setProps: (props: Partial<Record<string, unknown>>) => void;
}

export interface IAppRouter {
  start: () => void;
  go: (path: string, replace: boolean) => void;
  back: () => void;
  forward: () => void;
  use: (path: string, view: TBlockConstructor) => void;
}

export interface IRoute {
  match: (path: string) => boolean;
  render: () => void;
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
