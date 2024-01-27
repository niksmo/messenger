import type { TBlock, TBlockConstructor } from './router.ts';

export class Route {
  protected _view: TBlockConstructor;
  protected _block: TBlock | null = null;
  protected _path;
  protected _appRoot;

  constructor(path: string, view: TBlockConstructor, appRoot: HTMLElement) {
    this._path = path;
    this._view = view;
    this._appRoot = appRoot;
  }

  public match(path: string): boolean {
    return this._path === path;
  }

  public leave(): void {
    this._block?.dispatchWillUnmount();
    this._block?.getContent().remove();
    this._block = null;
  }

  public render(): void {
    this._block = new this._view();
    this._appRoot.append(this._block.getContent());
    this._block.dispatchDidMount();
  }
}
