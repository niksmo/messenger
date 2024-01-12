import { type IRoute, type BlockConstructor, type IBlock } from '../interfaces';
import { Store } from '../store';

const SLUG_PREFIX = '/:';

export class Route implements IRoute {
  protected _view: BlockConstructor;
  protected _block: IBlock | null = null;
  protected _path;
  protected _appRoot;
  protected _slug: string | null = null;

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
    this._block?.dispatchWillUnmount();
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

class RouteWithStub extends Route {
  protected _stubView;
  protected _redirectCb;

  constructor(
    path: string,
    view: BlockConstructor,
    stub: BlockConstructor,
    redirectCb: () => void,
    appRoot: HTMLElement
  ) {
    super(path, view, appRoot);
    this._stubView = stub;
    this._redirectCb = redirectCb;
  }

  update(path: string): void {
    this.leave();
    this.render(path);
  }

  protected renderView(path: string): void {
    const props = this._getProps(path);
    this._block = new this._view(props);
    this._appRoot.append(this._block.getContent());
    this._block.dispatchDidMount();
  }

  protected renderStub(): void {
    this._block = new this._stubView();
    this._appRoot.append(this._block.getContent());
    this._block.dispatchDidMount();
  }
}

interface IViewerState {
  viewer: {
    auth?: boolean;
  };
  [key: string]: unknown;
}

export class AuthRoute extends RouteWithStub {
  render(path: string): void {
    const store = Store.instance();

    const { viewer } = store.getState<IViewerState>();

    if (viewer?.auth === true) {
      this.renderView(path);
    } else if (viewer?.auth === false) {
      this._redirectCb();
    } else {
      this.renderStub();
    }
  }
}

export class NotAuthRoute extends RouteWithStub {
  render(path: string): void {
    const store = Store.instance();

    const { viewer } = store.getState<IViewerState>();

    if (viewer?.auth === false) {
      this.renderView(path);
    } else if (viewer?.auth === true) {
      this._redirectCb();
    } else {
      this.renderStub();
    }
  }
}
