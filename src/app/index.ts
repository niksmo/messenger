import { AppRouter } from 'shared/components/router';
import { PATH, SLUG } from 'shared/constants';
import { MainPage } from 'pages/main';
import { PageSignin } from 'pages/signin';
import { PageSignup } from 'pages/signup';
import { PageEditProfile } from 'pages/edit-profile';
import { PageChangePassword } from 'pages/change-password';
import { InternalErrorPage } from 'pages/500';
import { NotFoundPage } from 'pages/404';
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

    const router = new AppRouter();
    router.root(this._root);
    router.use(PATH.MAIN + SLUG.CHAT_ID, MainPage);
    router.use(PATH.EDIT_PROFILE, PageEditProfile);
    router.use(PATH.CHANGE_PASSWORD, PageChangePassword);
    router.use(PATH.SIGNIN, PageSignin);
    router.use(PATH.SIGNUP, PageSignup);
    router.use(PATH[404], NotFoundPage);
    router.use(PATH[500], InternalErrorPage);
    router.base(PATH.MAIN);
    router.noMatch(PATH[404]);
    router.start();
  }
}

export default new App();
