import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUTE_PATH } from 'shared/constants';
import { SignupAPI } from '../api/signup.api';
import {
  type TInputState,
  type TSignupState,
  fieldList,
} from '../model/signup.model';
import { getInputValue } from 'shared/helpers';

const STORE_SLICE = 'signup';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_LOAD = STORE_SLICE + '.load';

class SignupController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new SignupAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();

    this._verifier = verifierCreator.makeStringVerifier({
      first_name: { template: TEMPLATE.name, hint: HINT.name },
      second_name: { template: TEMPLATE.name, hint: HINT.name },
      email: { template: TEMPLATE.email, hint: HINT.email },
      phone: { template: TEMPLATE.phone, hint: HINT.phone },
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

    this._store.set(STORE_SLICE, { fields, load: false });
  }

  private _resetState(): void {
    this.start();
  }

  private _extractFormData(): Record<string, string> {
    const { signup } = this._store.getState<TSignupState>();
    const { fields } = signup;

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

    const { password, confirm } = formData;

    if (password !== undefined && confirm !== undefined) {
      const hint = password !== confirm ? HINT.confirmPassword : '';
      const error = Boolean(hint);

      this._store.set(`${STORE_FIELDS}.confirm`, {
        hint,
        error,
      });
      return !error;
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
      const { status, response } = await this._api.create(formData);

      if (status === 200) {
        this._resetState();
        this._router.go(ROUTE_PATH.MAIN, true);
      }

      if (status === 409) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string') {
            const field = reason.startsWith('Email') ? 'email' : 'login';

            this._store.set(`${STORE_FIELDS}.${field}`, {
              hint: reason,
              error: true,
            });
          }
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
  }

  public verify(): void {
    this._verify(this._extractFormData());
  }

  public submit(): void {
    void this._submit();
  }
}

const signupController = new SignupController();

export { signupController };
