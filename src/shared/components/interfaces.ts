export type BlockConstructor = new (props?: Record<string, unknown>) => IBlock;

export interface IBlock {
  didMount: () => void;
  didUpdate: () => void;
  dispatchDidMount: () => void;
  getContent: () => HTMLElement;
  setProps: (arg: Record<string, unknown>) => void;
  setVisible: () => void;
  setHidden: () => void;
  willUnmount: () => void;
  dispatchWillUnmount: () => void;
}

export interface IAppRouter {
  base: (path: string) => void;
  noMatch: (path: string) => void;
  go: (path: string, replace: boolean) => void;
  back: () => void;
  forward: () => void;
  start: () => void;
  use: (path: string, view: BlockConstructor) => void;
  authUse: (
    path: string,
    view: BlockConstructor,
    stub: BlockConstructor,
    redirectCb: () => void
  ) => void;
  notAuthUse: (
    path: string,
    view: BlockConstructor,
    stub: BlockConstructor,
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
  init: (state: Record<string, unknown>) => IStore;
  on: (fn: (state: Record<string, unknown>) => void) => IStore;
  set: (path: string, value: unknown) => IStore;
  getState: () => Record<string, unknown>;
}
