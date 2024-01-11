import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import { ROUT_PATH } from 'shared/constants';
import { ViewerAPI } from '../api';

interface ISigninController {
  getProfile: () => Record<string, unknown> | null;
  requestCredentials: () => Promise<void>;
}

// const STORE_SLICE = 'viewer';

class ViewerController implements ISigninController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ViewerAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  getProfile(): Record<string, unknown> | null {
    const state = this._store.getState();

    if (!('viewer' in state)) {
      return null;
    }

    const { viewer } = state;
    return viewer as Record<string, unknown>;
  }

  async requestCredentials(): Promise<void> {
    try {
      const xhr = await this._api.request();
      const { status, response } = xhr;

      if (status === 200) {
        this._router.go(ROUT_PATH.MAIN, true);
      }

      if (status === 401) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);
          console.log(reason);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const viewerController = new ViewerController();

export { viewerController };
