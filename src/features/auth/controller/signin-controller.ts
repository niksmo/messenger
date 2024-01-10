import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUT_PATH } from 'shared/constants';
import { SigninAPI } from '../api';

type TFormData = Record<string, string>;

interface IInputData {
  field: string;
  value: string;
}

interface ISigninController {
  input: (inputData: IInputData) => void;
  submit: (formData: TFormData) => void;
  verify: (formData: TFormData) => boolean;
}

const STORE_PATH = { ROOT: 'signin.', ERROR: 'signin.error' };

export class SigninController implements ISigninController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;

  constructor() {
    this._verifier = verifierCreator.makeStringVerifier({
      login: { template: TEMPLATE.login, hint: HINT.login },
      password: { template: TEMPLATE.password, hint: HINT.password },
    });
    this._api = new SigninAPI();
    this._store = Store.instance();
  }

  input({ field, value }: IInputData): void {
    this._store.set(STORE_PATH.ROOT + field, { value, error: false });
    this._store.set(STORE_PATH.ERROR, '');
  }

  verify(formData: TFormData): boolean {
    const { isValid, hintData } = this._verifier.checkOnValidity(formData);

    for (const field of Object.keys(hintData)) {
      const hint = hintData[field];
      if (typeof hint === 'string') {
        this._store.set(STORE_PATH.ROOT + field, {
          hint,
          error: Boolean(hint),
        });
      }
    }

    return isValid;
  }

  async submit(formData: TFormData): Promise<void> {
    if (this.verify(formData)) {
      try {
        const { status, response } = await this._api.request(formData);
        if (status === 200) {
          const router = AppRouter.instance();
          router.go(ROUT_PATH.MAIN, true);
        }

        if (status === 401) {
          if (typeof response === 'string') {
            const { reason } = JSON.parse(response);

            this._store.set(STORE_PATH.ERROR, reason);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
