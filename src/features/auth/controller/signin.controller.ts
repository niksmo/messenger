import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUTE_PATH } from 'shared/constants';
import { getInputValue } from 'shared/helpers';
import {
  fieldList,
  type TInputState,
  type TSigninState,
} from '../model/signin.model';
import { SigninAPI } from '../api/signin.api';

const STORE_SLICE = 'signin';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_ERROR = STORE_SLICE + '.error';
const STORE_LOAD = STORE_SLICE + '.load';

class SigninController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new SigninAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();

    this._verifier = verifierCreator.makeStringVerifier({
      login: { template: TEMPLATE.login, hint: HINT.login },
      password: { template: TEMPLATE.password, hint: HINT.password },
    });
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

    this._store.set(STORE_SLICE, { fields, error: '', load: false });
  }

  private _resetState(): void {
    this.start();
  }

  private _extractFormData(): Record<string, string> {
    const { signin } = this._store.getState<TSigninState>();
    const { fields } = signin;

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

  private _verify(formData: Record<string, string>): boolean {
    const { isValid, hintData } = this._verifier.checkOnValidity(formData);

    for (const field of Object.keys(hintData)) {
      const hint = hintData[field];
      if (typeof hint === 'string') {
        this._store.set(`${STORE_FIELDS}.${field}`, {
          hint,
          error: Boolean(hint),
        });
      }
    }

    return isValid;
  }

  private async _submit(): Promise<void> {
    const formData = this._extractFormData();

    if (!this._verify(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request(formData);
      const { status, response } = xhr;

      if (status === 200) {
        this._resetState();
        this._store.set('viewer', { auth: true });
        this._router.go(ROUTE_PATH.MAIN, true);
      }

      if (status === 401) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          this._store.set(STORE_ERROR, reason);
        }
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }

  public input(e: Event): void {
    const { field, value } = getInputValue(e);
    this._store.set(`${STORE_FIELDS}.${field}`, { value, error: false });
    this._store.set(STORE_ERROR, '');
  }

  public verify(): void {
    this._verify(this._extractFormData());
  }

  public submit(): void {
    void this._submit();
  }
}

const signinController = new SigninController();

export { signinController };
