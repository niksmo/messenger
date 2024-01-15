import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import { ROUTE_PATH } from 'shared/constants';
import { goToLoginWithUnauth } from 'shared/helpers';
import { AddChatAPI } from '../api';
import type { IAddChatFormState } from '../model';

interface IInputData {
  field: string;
  value: string;
}

const STORE_SLICE = 'addChat';
const STORE_LOAD = STORE_SLICE + '.load';

function isReqBody(
  formData: Record<string, string>
): formData is { title: string } {
  return 'title' in formData && typeof formData['title'] === 'string';
}

class AddChatController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new AddChatAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  start(): void {
    const initInputState = { value: '', hint: '', error: false };

    const initState: IAddChatFormState = {
      title: { ...initInputState },
      load: false,
    };

    this._store.set(STORE_SLICE, initState);
  }

  private _resetState(): void {
    this.start();
  }

  input({ field, value }: IInputData): void {
    this._store.set(`${STORE_SLICE}.${field}`, { value, error: false });
  }

  //

  async submit(formData: Record<string, string>): Promise<void> {
    if (!isReqBody(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.create(formData);
      const { status, response } = xhr;
      debugger;

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string' && reason.startsWith('Title')) {
            this._store.set(`${STORE_SLICE}.title`, {
              hint: reason,
              error: true,
            });
          }
        }
        return;
      }

      if (status === 200) {
        this._router.go(ROUTE_PATH.MAIN);
      }

      if (status === 401) {
        goToLoginWithUnauth();
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
      this._resetState();
    } catch (err) {
      console.warn(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }
}

const addChatController = new AddChatController();

export { addChatController };
