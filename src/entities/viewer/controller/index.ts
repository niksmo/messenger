import { Store } from 'shared/components/store';
import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { reviveNullToString } from 'shared/helpers';
import { ViewerAPI } from '../api';

interface ISigninController {
  requestCredentials: () => Promise<void>;
}

const STORE_SLICE = 'viewer';

class ViewerController implements ISigninController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ViewerAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  async requestCredentials(): Promise<void> {
    try {
      const xhr = await this._api.request();
      const { status, response } = xhr;

      if (status === 200) {
        if (typeof response === 'string') {
          const data = JSON.parse(response, reviveNullToString);
          const viewerData = Object.assign({ auth: true }, data);
          this._store.set(STORE_SLICE, viewerData);
        }
      }

      if (status === 401) {
        if (typeof response === 'string') {
          this._store.set(STORE_SLICE, { auth: false });
        }
      }

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);
          console.warn(reason);
        }
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

const viewerController = new ViewerController();

export { viewerController };
