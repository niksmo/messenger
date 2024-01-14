import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUTE_PATH } from 'shared/constants';
import { type IChangePasswordState } from '../model';
import { ChangePasswordAPI } from '../api';

type TFormData = Record<string, string>;

interface IInputData {
  field: string;
  value: string;
}

const STORE_SLICE = 'changePassword';
const STORE_LOAD = STORE_SLICE + '.load';

interface IReqBody {
  oldPassword: string;
  newPassword: string;
}

const FIELD = {
  CURRENT: 'current_password',
  NEW: 'new_password',
};

function extractRequestBody(formData: TFormData): IReqBody {
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

    const initState: IChangePasswordState['changePassword'] = {
      current_password: { ...initInputState },
      new_password: { ...initInputState },
      confirm: { ...initInputState },
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

  verify(formData: TFormData): boolean {
    const { isValid, hintData } = this._verifier.checkOnValidity(formData);

    for (const field of Object.keys(hintData)) {
      const hint = hintData[field];
      if (typeof hint === 'string') {
        this._store.set(`${STORE_SLICE}.${field}`, {
          hint,
          error: Boolean(hint),
        });
      }
    }

    const { new_password: newPassword, confirm } = formData;

    if (newPassword !== undefined && confirm !== undefined) {
      const hint = newPassword !== confirm ? HINT.confirmPassword : '';
      const error = Boolean(hint);

      this._store.set(`${STORE_SLICE}.confirm`, {
        hint,
        error,
      });
      return !error;
    }

    return isValid;
  }

  async submit(formData: Record<string, string>): Promise<void> {
    if (!this.verify(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);
      const reqBody = extractRequestBody(formData);
      const { status, response } = await this._api.update(reqBody);

      if (status === 200) {
        this._resetState();
        this._router.go(ROUTE_PATH.SETTINGS, true);
      }

      if (status === 400) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string' && reason.startsWith('Password')) {
            this._store.set(`${STORE_SLICE}.current_password`, {
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
}

const changePasswordController = new ChangePasswordController();

export { changePasswordController };
