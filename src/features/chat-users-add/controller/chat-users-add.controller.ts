import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router';
import {
  getInputValue,
  goToLoginWithUnauth,
  isSomeValues,
} from 'shared/helpers';
import { ROUTE_PATH } from 'shared/constants';
import {
  type TAddUsersState,
  type TInputState,
  fieldList,
} from '../model/chat-users-add.model';
import { ChatUsersAddAPI } from '../api/chat-users-add.api';

const STORE_SLICE = 'addUsers';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_FOUND = STORE_SLICE + '.found';
const STORE_SELECT = STORE_SLICE + '.select';
const STORE_LOAD = STORE_SLICE + '.load';

export class AddChatUsersController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatUsersAddAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  start(): void {
    const initInputState = { value: '', hint: '', error: false };

    const fields = fieldList.reduce<Record<string, TInputState>>(
      (map, fieldName) => {
        map[fieldName] = { ...initInputState };
        return map;
      },
      {}
    );

    //target delete
    const cache = localStorage.getItem('found');

    this._store.set(STORE_SLICE, {
      fields,
      load: false,
      //target delete
      found: cache ? JSON.parse(cache) : [],
      select: [],
    });
  }

  private _resetState(): void {
    this.start();
  }

  private _extractFormData(): Record<string, string> {
    const { addUsers } = this._store.getState<TAddUsersState>();
    const { fields } = addUsers;

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

  private async _searchUsers(): Promise<void> {
    const formData = this._extractFormData();
    if (!isSomeValues(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request(formData);
      const { status, response } = xhr;

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string' && reason.startsWith('Login')) {
            this._store.set(`${STORE_FIELDS}.login`, {
              hint: reason,
              error: true,
            });
          }
        }
        return;
      }

      if (status === 200) {
        if (typeof response === 'string') {
          localStorage.setItem('found', response);
          const found = JSON.parse(response);
          console.log(found);
          this._store.set(STORE_FOUND, found);
          return;
        }
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

  public input(e: Event): void {
    const { field, value } = getInputValue(e);
    this._store.set(`${STORE_FIELDS}.${field}`, { value, error: false });
  }

  public searchUsers(): void {
    void this._searchUsers();
  }
}

const addChatUsersController = new AddChatUsersController();

export { addChatUsersController };
