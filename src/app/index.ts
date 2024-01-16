import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH, ROUTE_SLUG } from 'shared/constants';
import { Store } from 'shared/components/store';
import { RequestAuthStub } from 'entites/viewer/ui/request-auth-stub';
import { goToLogin, goToMain } from 'shared/helpers';
import PAGE from 'pages/pages';
import './styles/index.css';

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
      ROUTE_PATH.MAIN + ROUTE_SLUG.CHAT_ID,
      PAGE.Main,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUTE_PATH.ADD_CHAT,
      PAGE.AddChat,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUTE_PATH.SETTINGS,
      PAGE.Settings,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUTE_PATH.EDIT_PROFILE,
      PAGE.EditProfile,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUTE_PATH.CHANGE_PASSWORD,
      PAGE.ChangePassword,
      RequestAuthStub,
      goToLogin
    );

    router.authUse(
      ROUTE_PATH.CHANGE_AVATAR,
      PAGE.ChangeAvatar,
      RequestAuthStub,
      goToLogin
    );

    router.notAuthUse(
      ROUTE_PATH.SIGNIN,
      PAGE.Signin,
      RequestAuthStub,
      goToMain
    );

    router.notAuthUse(
      ROUTE_PATH.SIGNUP,
      PAGE.Signup,
      RequestAuthStub,
      goToMain
    );

    router.use(ROUTE_PATH[404], PAGE.NotFound);
    router.use(ROUTE_PATH[500], PAGE.InternalError);
    router.noMatch(ROUTE_PATH[404]);
    router.start();
  }
}

export default new App();
