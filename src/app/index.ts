import { AppRouter } from 'shared/components/router';
import { ROUT_PATH, ROUT_SLUG } from 'shared/constants';
import PAGE from 'pages';
import './styles/index.css';
import { Store } from 'shared/components/store';
import { RequestAuthStub } from 'entites/viewer';
import { goToLogin, goToMain } from 'shared/helpers';

class App {
  private _root: null | HTMLElement = null;

  initRoot(root: HTMLElement): this {
    this._root = root;
    return this;
  }

  bootstrap(): void {
    if (this._root === null) {
      return;
    }

    const store = new Store();
    store.init();

    const router = new AppRouter();
    router.root(this._root);

    router.authUse(
      ROUT_PATH.MAIN + ROUT_SLUG.CHAT_ID,
      PAGE.Main,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUT_PATH.SETTINGS,
      PAGE.Settings,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUT_PATH.EDIT_PROFILE,
      PAGE.EditProfile,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUT_PATH.CHANGE_PASSWORD,
      PAGE.ChangePassword,
      RequestAuthStub,
      goToLogin
    );

    router.notAuthUse(ROUT_PATH.SIGNIN, PAGE.Signin, RequestAuthStub, goToMain);
    router.notAuthUse(ROUT_PATH.SIGNUP, PAGE.Signup, RequestAuthStub, goToMain);
    router.use(ROUT_PATH[404], PAGE.NotFound);
    router.use(ROUT_PATH[500], PAGE.InternalError);
    router.noMatch(ROUT_PATH[404]);
    router.start();
  }
}

export default new App();
