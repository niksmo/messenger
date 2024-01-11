import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUT_PATH } from 'shared/constants';
import { type ISignupState } from '../model';
import { SignupAPI } from '../api';

type TFormData = Record<string, string>;

interface IInputData {
  field: string;
  value: string;
}

interface ISignupController {
  initBlock: () => void;
  input: (inputData: IInputData) => void;
  submit: (formData: TFormData) => void;
  verify: (formData: TFormData) => boolean;
}

const STORE_SLICE = 'signup';
const STORE_ERROR = STORE_SLICE + '.error';
const STORE_LOAD = STORE_SLICE + '.load';

class SignupController implements ISignupController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._verifier = verifierCreator.makeStringVerifier({
      first_name: { template: TEMPLATE.name, hint: HINT.name },
      second_name: { template: TEMPLATE.name, hint: HINT.name },
      email: { template: TEMPLATE.email, hint: HINT.email },
      phone: { template: TEMPLATE.phone, hint: HINT.phone },
      login: { template: TEMPLATE.login, hint: HINT.login },
      password: { template: TEMPLATE.password, hint: HINT.password },
    });

    this._api = new SignupAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  initBlock(): void {
    const initInputState = { value: '', hint: '', error: false };

    const initState: ISignupState['signup'] = {
      first_name: { ...initInputState },
      second_name: { ...initInputState },
      email: { ...initInputState },
      phone: { ...initInputState },
      login: { ...initInputState },
      password: { ...initInputState },
      confirm: { ...initInputState },
      load: false,
    };

    this._store.set(STORE_SLICE, initState);
  }

  private _resetState(): void {
    this.initBlock();
  }

  input({ field, value }: IInputData): void {
    this._store.set(`${STORE_SLICE}.${field}`, { value, error: false });
    this._store.set(STORE_ERROR, '');
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

    const { password, confirm } = formData;

    if (password !== undefined && confirm !== undefined) {
      const hint = password !== confirm ? 'Passwords don"t match' : '';
      const error = Boolean(hint);

      this._store.set(`${STORE_SLICE}.confirm`, {
        hint,
        error,
      });
      return !error;
    }

    return isValid;
  }

  async submit(formData: TFormData): Promise<void> {
    if (!this.verify(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);
      const { status, response } = await this._api.request(formData);

      if (status === 200) {
        this._resetState();
        this._router.go(ROUT_PATH.SIGNIN, false);
      }

      if (status === 409) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          if (typeof reason === 'string') {
            const field = reason.startsWith('Email') ? 'email' : 'login';

            this._store.set(`${STORE_SLICE}.${field}`, {
              hint: reason,
              error: true,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }
}

const signupController = new SignupController();

export { signupController };
