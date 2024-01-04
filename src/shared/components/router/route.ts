import { type IRoute, type BlockConstructor, type IBlock } from '../interfaces';

const SLUG_PREFIX = '/:';

export class Route implements IRoute {
  _view: BlockConstructor;
  _block: IBlock | null = null;
  _path;
  _appRoot;
  _slug: string | null = null;

  constructor(path: string, view: BlockConstructor, appRoot: HTMLElement) {
    this._path = path;
    this._view = view;
    this._appRoot = appRoot;
    this._initSlug();
  }

  _initSlug(): void {
    if (this._path.includes(SLUG_PREFIX)) {
      const [path, param] = this._path.split(SLUG_PREFIX);

      if (param && path) {
        this._slug = param;
        this._path = path;
      }
    }
  }

  _getProps(path: string): Record<string, string> {
    const props: Record<string, string> = {};

    if (this._slug) {
      props[this._slug] = path.split(this._path + '/')[1] ?? '';
    }
    return props;
  }

  match(path: string): boolean {
    if (this._slug) {
      const pattern = new RegExp(
        `(^${this._path}$)|(^${this._path}/[a-zA-Z0-9-_]+$)`
      );
      return pattern.test(path);
    } else {
      return this._path === path;
    }
  }

  leave(): void {
    this._block?.getContent().remove();
    this._block = null;
  }

  render(path: string): void {
    const props = this._getProps(path);
    this._block = new this._view(props);
    this._appRoot.append(this._block.getContent());
    this._block.dispatchDidMount();
  }

  update(path: string): void {
    const props = this._getProps(path);

    if (this._block) {
      this._block.setProps(props);
    }
  }
}
