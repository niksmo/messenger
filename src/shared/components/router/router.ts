import { Block } from '../block/block.ts';
import { Route } from './_route.ts';

type TBlockConstructor = new (props?: Record<string, unknown>) => Block;

export class AppRouter {
  private static _instance: AppRouter | null = null;
  private readonly _history: History;
  private readonly _routes: Route[] = [];
  private _appRoot: HTMLElement | null = null;
  private _noMatchRoute: string | null = null;
  private _currentRoute: Route | null = null;

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

    this._render(route);
  }

  private _getRoute(path: string): Route | undefined {
    return this._routes.find((route) => route.match(path));
  }

  private _render(route: Route): void {
    this._currentRoute?.leave();
    this._currentRoute = route;
    this._currentRoute.render();
  }

  private _onRoute(path: string): void {
    const route = this._getRoute(path);

    if (!route) {
      this._noMatch();
      return;
    }

    this._render(route);
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

  getHistoryState<TIndexed extends Record<string, unknown>>(): TIndexed {
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
}
