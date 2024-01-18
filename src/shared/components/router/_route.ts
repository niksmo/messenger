import {
  type IRoute,
  type TBlockConstructor,
  type IBlock,
} from '../interfaces';

export class Route implements IRoute {
  protected _view: TBlockConstructor;
  protected _block: IBlock | null = null;
  protected _path;
  protected _appRoot;

  constructor(path: string, view: TBlockConstructor, appRoot: HTMLElement) {
    this._path = path;
    this._view = view;
    this._appRoot = appRoot;
  }

  match(path: string): boolean {
    return this._path === path;
  }

  leave(): void {
    this._block?.dispatchWillUnmount();
    this._block?.getContent().remove();
    this._block = null;
  }

  render(): void {
    this._block = new this._view();
    this._appRoot.append(this._block.getContent());
    this._block.dispatchDidMount();
  }
}
