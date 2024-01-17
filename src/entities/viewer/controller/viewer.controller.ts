import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { reviveNullToString } from 'shared/helpers/json';
import { ViewerAPI } from '../api/viewer.api';

const STORE_SLICE = 'viewer';

class ViewerController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ViewerAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  private _goToLoacation(): void {
    this._router.go(window.location.pathname, true);
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
          this._goToLoacation();
        }
      }

      if (status === 401) {
        if (typeof response === 'string') {
          this._store.set(STORE_SLICE, { auth: false });
          this._goToLoacation();
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
