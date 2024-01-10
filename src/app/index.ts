import { AppRouter } from 'shared/components/router';
import { ROUT_PATH, ROUT_SLUG } from 'shared/constants';
import PAGE from 'pages';
import './styles/index.css';
import { Store } from 'shared/components/store';

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
    router.use(ROUT_PATH.MAIN + ROUT_SLUG.CHAT_ID, PAGE.Main);
    router.use(ROUT_PATH.SETTINGS, PAGE.Settings);
    router.use(ROUT_PATH.EDIT_PROFILE, PAGE.EditProfile);
    router.use(ROUT_PATH.CHANGE_PASSWORD, PAGE.ChangePassword);
    router.use(ROUT_PATH.SIGNIN, PAGE.Signin);
    router.use(ROUT_PATH.SIGNUP, PAGE.Signup);
    router.use(ROUT_PATH[404], PAGE.NotFound);
    router.use(ROUT_PATH[500], PAGE.InternalError);
    router.noMatch(ROUT_PATH[404]);
    router.start();
  }
}

export default new App();
