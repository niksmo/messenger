import { AppRouter } from 'shared/components/router';
import { PATH, SLUG } from 'shared/constants';
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
    router.use(PATH.MAIN + SLUG.CHAT_ID, PAGE.Main);
    router.use(PATH.SETTINGS, PAGE.Settings);
    router.use(PATH.EDIT_PROFILE, PAGE.EditProfile);
    router.use(PATH.CHANGE_PASSWORD, PAGE.ChangePassword);
    router.use(PATH.SIGNIN, PAGE.Signin);
    router.use(PATH.SIGNUP, PAGE.Signup);
    router.use(PATH[404], PAGE.NotFound);
    router.use(PATH[500], PAGE.InternalError);
    router.noMatch(PATH[404]);
    router.start();
  }
}

export default new App();
