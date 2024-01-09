export type BlockConstructor = new (props?: Record<string, unknown>) => IBlock;

export interface IBlock {
  didMount: () => void;
  didUpdate: () => void;
  dispatchDidMount: () => void;
  getContent: () => HTMLElement;
  setProps: (arg: Record<string, unknown>) => void;
  setVisible: () => void;
  setHidden: () => void;
}

export interface IBlockInput extends IBlock {
  getType: () => string;
  getName: () => string;
  getValue: () => string;
  setProps: (props: {
    support?: string;
    error?: boolean;
    value?: string;
    onInput?: (e: Event) => void;
    onBlur?: (e: Event) => void;
  }) => void;
}

export interface IAppRouter {
  use: (path: string, view: BlockConstructor) => void;
  base: (path: string) => void;
  noMatch: (path: string) => void;
  go: (path: string, replace: boolean) => void;
  back: () => void;
  forward: () => void;
  start: () => void;
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
}
