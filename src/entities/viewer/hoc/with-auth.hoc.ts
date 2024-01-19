import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import type { Block } from 'shared/components/block/block';
import { RequestAuthStub } from '../ui/auth-guard/auth-guard.block';
import type { TViewerState } from '../model/viewer.model';
import { viewerController } from '../controller/viewer.controller';

const store = Store.instance();
const router = AppRouter.instance();

export function withAuth(View: new () => Block): new () => Block {
  return class AuthGuard extends RequestAuthStub {
    private _block: Block | null = null;

    constructor() {
      const { auth, fetching } = store.getState<TViewerState>().viewer;
      const block = fetching || !auth ? null : new View();

      super({ fetching, block });
      this._block = block;
    }

    public didMount(): void {
      store.on(this._onStoreUpdate);
      const { auth } = store.getState<TViewerState>().viewer;
      if (!auth) {
        void viewerController.requestCredentials();
      }
    }

    public willUnmount(): void {
      store.off(this._onStoreUpdate);
    }

    private readonly _onStoreUpdate = (state: TViewerState): void => {
      const { auth, fetching } = state.viewer;
      if (this._block === null || !auth) {
        if (!fetching && !auth) {
          router.go(ROUTE_PATH.SIGNIN, true, { prev: location.pathname });
          return;
        }

        const block = fetching ? null : new View();
        this.setProps({ fetching, block });

        if (block) {
          this._block = block;
          block.dispatchDidMount();
        }
      }
    };
  };
}
