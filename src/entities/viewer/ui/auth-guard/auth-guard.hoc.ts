import { Block } from 'shared/components/block/block';
import { viewerController } from '../../controller/viewer.controller';
import templateSpec from './request-auth-stub.template.hbs';
import { Store } from 'shared/components/store/store';
import type { TViewerState } from 'entites/viewer/model/viewer.model';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';

export class RequestAuthStub extends Block {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}

export function withAuth(constructor: new () => Block): new () => Block {
  return class AuthGuard extends RequestAuthStub {
    _targetView;
    _routeBlock: null | Block;
    _currentEl;
    _store;
    _router;

    constructor() {
      super();
      this._store = Store.instance();
      this._router = AppRouter.instance();
      this._targetView = constructor;
      this._routeBlock = null;
      this._currentEl = this.getContent();
    }

    public getContent(): HTMLElement {
      const { auth } = this._store.getState<TViewerState>().viewer;

      if (auth) {
        if (!this._routeBlock) {
          this._routeBlock = new this._targetView();
          this._routeBlock.dispatchDidMount();
        }
        return this._routeBlock.getContent();
      }

      return super.getContent();
    }

    public didMount(): void {
      void viewerController.requestCredentials();
      this._store.on(this._onStoreUpdate);
    }

    public didUpdate(): void {
      const { auth, fetching } = this._store.getState<TViewerState>().viewer;

      if (fetching) {
        return;
      }

      if (!auth) {
        this._router.go(ROUTE_PATH.SIGNIN, true, { prev: location.pathname });
        return;
      }

      if (!this._routeBlock) {
        this._routeBlock = new this._targetView();
        const targetElement = this._routeBlock.getContent();
        this._currentEl.replaceWith(targetElement);
        this._currentEl = targetElement;
        this._routeBlock.dispatchDidMount();
      }

      if (this._routeBlock) {
        this._routeBlock.dispatchDidUpdate();
      }
    }

    public willUnmount(): void {
      this._store.off(this._onStoreUpdate);
      this._currentEl.remove();
      this._routeBlock?.dispatchWillUnmount();
    }

    private readonly _onStoreUpdate = (): void => {
      this.didUpdate();
    };
  };
}

export function withUnAuth(constructor: new () => Block): new () => Block {
  return class AuthGuard extends RequestAuthStub {
    _targetView;
    _routeBlock: null | Block;
    _currentEl;
    _store;
    _router;

    constructor() {
      super();
      this._store = Store.instance();
      this._router = AppRouter.instance();
      this._targetView = constructor;
      this._routeBlock = null;
      this._currentEl = this.getContent();
    }

    protected getTemplateHook(): TemplateSpecification {
      return templateSpec;
    }

    public getContent(): HTMLElement {
      const { auth } = this._store.getState<TViewerState>().viewer;

      if (!auth) {
        if (!this._routeBlock) {
          this._routeBlock = new this._targetView();
          this._routeBlock.dispatchDidMount();
        }
        return this._routeBlock.getContent();
      }

      return super.getContent();
    }

    public didMount(): void {
      void viewerController.requestCredentials();
      this._store.on(this._onStoreUpdate);
    }

    public didUpdate(): void {
      const { auth, fetching } = this._store.getState<TViewerState>().viewer;

      if (fetching) {
        return;
      }

      if (auth) {
        this._router.go(ROUTE_PATH.MAIN, true);
        return;
      }

      if (!this._routeBlock) {
        this._routeBlock = new this._targetView();
        const targetElement = this._routeBlock.getContent();
        this._currentEl.replaceWith(targetElement);
        this._currentEl = targetElement;
        this._routeBlock.dispatchDidMount();
      }

      if (this._routeBlock) {
        this._routeBlock.dispatchDidUpdate();
      }
    }

    public willUnmount(): void {
      this._store.off(this._onStoreUpdate);
      this._currentEl.remove();
      this._routeBlock?.dispatchWillUnmount();
    }

    private readonly _onStoreUpdate = (): void => {
      this.didUpdate();
    };
  };
}
