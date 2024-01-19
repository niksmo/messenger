import { AppRouter } from 'shared/components/router/router';
import { Store } from 'shared/components/store/store';
import { ROUTE_PATH } from 'shared/constants/routes';
import { getInputValue } from 'shared/helpers/get';
import { AddChatAPI } from '../api/chat-add.api';
import {
  type TAddChatState,
  type TInputState,
  fieldList,
} from '../model/chat-add.model';

const STORE_SLICE = 'addChat';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_LOAD = STORE_SLICE + '.load';

class AddChatController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new AddChatAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  public start(): void {
    const fields: Record<string, TInputState> = {};

    fieldList.reduce((map, fieldName) => {
      map[fieldName] = { value: '', hint: '', error: false };
      return map;
    }, fields);

    this._store.set(STORE_SLICE, { fields, load: false });
  }

  private _extractFormData(): Record<string, string> {
    const { addChat } = this._store.getState<TAddChatState>();
    const { fields } = addChat;

    const entries = Object.entries<TInputState>({ ...fields });

    const formData = entries.reduce<Record<string, string>>(
      (map, [fieldName, inputState]) => {
        map[fieldName] = inputState.value;
        return map;
      },
      {}
    );

    return formData;
  }

  private async _submit(): Promise<void> {
    const formData = this._extractFormData();

    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.create(formData);
      const { status, response } = xhr;

      if (status === 200) {
        this._router.go(ROUTE_PATH.MAIN);
        return;
      }

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string' && reason.startsWith('Title')) {
            this._store.set(`${STORE_FIELDS}.title`, {
              hint: reason,
              error: true,
            });
          }
        }
        return;
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
        return;
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this.start();
      this._store.set(STORE_LOAD, false);
    }
  }

  public input(e: Event): void {
    const { field, value } = getInputValue(e);
    this._store.set(`${STORE_FIELDS}.${field}`, { value, error: false });
  }

  public submit(): void {
    void this._submit();
  }
}

const addChatController = new AddChatController();

export { addChatController };
