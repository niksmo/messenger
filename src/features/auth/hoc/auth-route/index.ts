import { Block } from 'shared/components/block';
import templateSpec from './auth-route.template.hbs';
import { Store } from 'shared/components/store';
import { AppRouter } from 'shared/components/router';
import { ROUT_PATH } from 'shared/constants';
import { viewerController } from 'features/auth/controller';

export class AuthRoute extends Block {
  constructor() {
    super();

    const store = Store.instance();
    const router = AppRouter.instance();

    const viewer = viewerController.getProfile();

    if (viewer) {
      router.go(ROUT_PATH.MAIN);
    } else {
      void viewerController.requestCredentials();
    }

    store.on<{ viewer: { auth: boolean } }>((state) => {
      const { auth } = state.viewer;

      if (auth) {
        router.go(ROUT_PATH.MAIN);
      } else {
        router.go(ROUT_PATH.SIGNIN);
      }
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
