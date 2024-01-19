import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { LogoutAPI } from '../api/logout.api';

const STORE_SLICE = 'viewer';

export class LogoutController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new LogoutAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  async logout(): Promise<void> {
    try {
      const xhr = await this._api.request();
      const { status } = xhr;

      if (status === 200) {
        this._store.set(STORE_SLICE, { auth: false });
        return;
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (error) {}
  }
}

const logoutController = new LogoutController();

export { logoutController };
