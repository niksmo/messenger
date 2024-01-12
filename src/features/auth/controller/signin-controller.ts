import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUT_PATH } from 'shared/constants';
import { type ISigninState } from '../model';
import { SigninAPI } from '../api';

type TFormData = Record<string, string>;

interface IInputData {
  field: string;
  value: string;
}

interface ISigninController {
  initBlock: () => void;
  input: (inputData: IInputData) => void;
  submit: (formData: TFormData) => void;
  verify: (formData: TFormData) => boolean;
}

const STORE_SLICE = 'signin';
const STORE_ERROR = STORE_SLICE + '.error';
const STORE_LOAD = STORE_SLICE + '.load';

class SigninController implements ISigninController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._verifier = verifierCreator.makeStringVerifier({
      login: { template: TEMPLATE.login, hint: HINT.login },
      password: { template: TEMPLATE.password, hint: HINT.password },
    });
    this._api = new SigninAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  initBlock(): void {
    const initInputState = { value: '', hint: '', error: false };

    const initState: ISigninState['signin'] = {
      login: { ...initInputState },
      password: { ...initInputState },
      error: '',
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

    return isValid;
  }

  async submit(formData: TFormData): Promise<void> {
    if (!this.verify(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);

      const xhr = await this._api.request(formData);
      const { status, response } = xhr;

      if (status === 200) {
        this._resetState();
        this._store.set('viewer', { auth: true });
        this._router.go(ROUT_PATH.MAIN, true);
      }

      if (status === 401) {
        if (typeof response === 'string') {
          const { reason } = JSON.parse(response);

          this._store.set(STORE_ERROR, reason);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }
}

const signinController = new SigninController();

export { signinController };
