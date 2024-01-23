import { AppRouter } from 'shared/components/router/router';
import { Store } from 'shared/components/store/store';
import { verifierCreator } from 'shared/components/form-verifier/verifier';
import { HINT, TEMPLATE } from 'shared/components/form-verifier/templates';
import { ROUTE_PATH } from 'shared/constants/routes';
import { getInputValue } from 'shared/helpers/get';
import { ChangePasswordAPI } from '../api/change-password.api';
import {
  type TInputState,
  type TChangePasswordState,
  fieldList,
} from '../model/change-password.model';

const STORE_SLICE = 'changePassword';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_LOAD = STORE_SLICE + '.load';

const FIELD = {
  CURRENT: 'current_password',
  NEW: 'new_password',
};

interface IReqBody {
  oldPassword: string;
  newPassword: string;
}

class ChangePasswordController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._verifier = verifierCreator.makeStringVerifier({
      current_password: { template: TEMPLATE.password, hint: HINT.password },
      new_password: { template: TEMPLATE.password, hint: HINT.password },
    });

    this._api = new ChangePasswordAPI();
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

    this._store.set(STORE_SLICE, { fields, load: false });
  }

  private _extractFormData(): Record<string, string> {
    const { changePassword } = this._store.getState<TChangePasswordState>();
    const { fields } = changePassword;

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

  private _extractRequestBody(formData: Record<string, string>): IReqBody {
    const map = Object.entries(formData).reduce<IReqBody>(
      (map, [field, value]) => {
        if (field === FIELD.CURRENT) {
          map.oldPassword = value;
        }

        if (field === FIELD.NEW) {
          map.newPassword = value;
        }

        return map;
      },
      { oldPassword: '', newPassword: '' }
    );

    return map;
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

    const { new_password: newPassword, confirm } = formData;

    if (newPassword !== undefined && confirm !== undefined) {
      const hint = newPassword !== confirm ? HINT.confirmPassword : '';
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
      const reqBody = this._extractRequestBody(formData);
      const { status, response } = await this._api.update(reqBody);

      if (status === 200) {
        this.start();
        this._router.go(ROUTE_PATH.SETTINGS, true);
        return;
      }

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string' && reason.startsWith('Password')) {
            this._store.set(`${STORE_FIELDS}.current_password`, {
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

const changePasswordController = new ChangePasswordController();

export { changePasswordController };
