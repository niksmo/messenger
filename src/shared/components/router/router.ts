import {
  type IAppRouter,
  type TBlockConstructor,
  type IRoute,
} from '../interfaces';
import { AuthRoute, NotAuthRoute, Route } from './_route';

const INIT_BASE_PATH = '/';

export class AppRouter implements IAppRouter {
  private static _instance: AppRouter | null = null;
  private readonly _history: History;
  private readonly _routes: IRoute[] = [];
  private _appRoot: HTMLElement | null = null;
  private _baseRoute: string | null = null;
  private _noMatchRoute: string | null = null;
  private _currentRoute: IRoute | null = null;

  constructor() {
    const { history } = window;

    if (!history) {
      throw Error('AppRouter work only in browsers');
    }

    this._history = history;

    if (AppRouter._instance) {
      return AppRouter._instance;
    }

    AppRouter._instance = this;
  }

  static instance(): AppRouter {
    if (AppRouter._instance === null) {
      AppRouter._instance = new AppRouter();
    }
    return AppRouter._instance;
  }

  private _noMatch(): void {
    if (this._noMatchRoute === null) {
      throw Error(
        '"Not Found Path" is not exist, define router.noMatch(pathname)'
      );
    }

    const route = this._getRoute(this._noMatchRoute);

    if (!route) {
      throw Error(
        '"Not Found View" is not exist, define router.use(pathname, view)'
      );
    }

    this._history.replaceState({}, '', this._noMatchRoute);

    this._render(this._noMatchRoute, route);
  }

  private _getRoute(path: string): IRoute | undefined {
    return this._routes.find((route) => route.match(path));
  }

  private _render(path: string, route: IRoute): void {
    this._currentRoute?.leave();
    this._currentRoute = route;
    this._currentRoute.render(path);
  }

  private _onRoute(path: string): void {
    if (path === INIT_BASE_PATH && this._baseRoute) {
      this._history.replaceState({}, '', this._baseRoute);
      path = this._baseRoute;
    }

    const route = this._getRoute(path);

    if (!route) {
      this._noMatch();
      return;
    }

    if (this._currentRoute === route) {
      route.update(path);
      return;
    }

    this._render(path, route);
  }

  private _isRoot(appRoot: HTMLElement | null): appRoot is HTMLElement {
    if (appRoot === null) {
      throw Error('"appRoot" is not exist, define router.root(HTMLElement)');
    }
    return true;
  }

  root(appRoot: HTMLElement): void {
    this._appRoot = appRoot;
  }

  base(path: string): void {
    this._baseRoute = path;
  }

  noMatch(path: string): void {
    this._noMatchRoute = path;
  }

  go(
    path: string,
    replace: boolean = false,
    state: Record<string, unknown> = {}
  ): void {
    if (replace) {
      this._history.replaceState(state, '', path);
    } else {
      this._history.pushState(state, '', path);
    }

    this._onRoute(path);
  }

  back(): void {
    this._history.back();
  }

  forward(): void {
    this._history.forward();
  }

  getState<TIndexed extends Record<string, unknown>>(): TIndexed {
    return this._history.state;
  }

  start(): void {
    window.addEventListener('popstate', (evt) => {
      const { currentTarget } = evt;
      if (currentTarget instanceof Window) {
        const { pathname } = currentTarget.location;
        this._onRoute(pathname);
      }
    });

    const { pathname } = window.location;
    this._onRoute(pathname);
  }

  use(path: string, view: TBlockConstructor): void {
    if (this._isRoot(this._appRoot)) {
      const route = new Route(path, view, this._appRoot);
      this._routes.push(route);
    }
  }

  authUse(
    path: string,
    view: TBlockConstructor,
    stub: TBlockConstructor,
    redirectCb: () => void
  ): void {
    if (this._isRoot(this._appRoot)) {
      const route = new AuthRoute(path, view, stub, redirectCb, this._appRoot);
      this._routes.push(route);
    }
  }

  notAuthUse(
    path: string,
    view: TBlockConstructor,
    stub: TBlockConstructor,
    redirectCb: () => void
  ): void {
    if (this._isRoot(this._appRoot)) {
      const route = new NotAuthRoute(
        path,
        view,
        stub,
        redirectCb,
        this._appRoot
      );
      this._routes.push(route);
    }
  }
}
