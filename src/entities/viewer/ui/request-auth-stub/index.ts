import { Block } from 'shared/components/block';
import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import { viewerController } from 'entites/viewer/controller';
import { type IViewerState } from 'entites/viewer/model';
import templateSpec from './request-auth-stub.template.hbs';

const store = Store.instance();

export class RequestAuthStub extends Block {
  private readonly _onStoreUpdate;
  constructor() {
    super();

    this._onStoreUpdate = (state: IViewerState) => {
      const { viewer } = state;
      if (typeof viewer.auth === 'boolean') {
        const router = AppRouter.instance();
        router.go(window.location.pathname, true);
      }
    };

    store.on<IViewerState>(this._onStoreUpdate);

    void viewerController.requestCredentials();
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
