import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { Store } from 'shared/components/store/store';
import PAGE from 'pages/pages';
import './styles/index.css';
import { viewer } from 'entites/viewer/model/viewer.model';
import { chatList } from 'entites/chat/model/chat-list.model';
import {
  withAuth,
  withUnAuth,
} from 'entites/viewer/ui/auth-guard/auth-guard.hoc';

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
    store.start({ ...viewer, ...chatList });

    const router = new AppRouter();
    router.root(this._root);
    router.use(ROUTE_PATH.MAIN, withAuth(PAGE.Main));
    router.use(ROUTE_PATH.ADD_CHAT, withAuth(PAGE.AddChat));
    router.use(ROUTE_PATH.ADD_USERS, withAuth(PAGE.AddUsers));
    router.use(ROUTE_PATH.DELETE_USERS, withAuth(PAGE.DeleteUsers));
    router.use(ROUTE_PATH.SETTINGS, withAuth(PAGE.Settings));
    router.use(ROUTE_PATH.EDIT_PROFILE, withAuth(PAGE.EditProfile));
    router.use(ROUTE_PATH.CHANGE_PASSWORD, withAuth(PAGE.ChangePassword));
    router.use(ROUTE_PATH.CHANGE_AVATAR, withAuth(PAGE.ChangeAvatar));
    router.use(ROUTE_PATH.SIGNIN, withUnAuth(PAGE.Signin));
    router.use(ROUTE_PATH.SIGNUP, withUnAuth(PAGE.Signup));
    router.use(ROUTE_PATH[404], PAGE.NotFound);
    router.use(ROUTE_PATH[500], PAGE.InternalError);
    router.noMatch(ROUTE_PATH[404]);
    router.start();
  }
}

export default new App();
