import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import { PATH } from 'shared/constants';

type TFormData = Record<string, string>;

interface ISigninController {
  input: (field: string, value: string) => void;
  submit: (formData: TFormData) => void;
  verify: (formData: TFormData) => boolean;
}

interface IVerifier {
  checkOnValidity: (formData: TFormData) => {
    hintData: TFormData;
    isValid: boolean;
  };
}

interface IAPI {
  request: (formData: TFormData) => Promise<XMLHttpRequest>;
}

export class SigninController implements ISigninController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;

  constructor(verifier: IVerifier, api: IAPI) {
    this._verifier = verifier;
    this._api = api;
    this._store = Store.instance();
  }

  input(field: string, value: string): void {
    this._store.set(`signin.${field}.value`, value);
    this._store.set(`signin.${field}.error`, false);
    this._store.set('signin.error', '');
  }

  verify(formData: TFormData): boolean {
    const { isValid, hintData } = this._verifier.checkOnValidity(formData);

    if (!isValid) {
      for (const field of Object.keys(hintData)) {
        const hintText = hintData[field];
        if (typeof hintText === 'string') {
          this._store.set(`signin.${field}.support`, hintText);
          this._store.set(`signin.${field}.error`, true);
        }
      }
    }

    return isValid;
  }

  async submit(formData: TFormData): Promise<void> {
    if (this.verify(formData)) {
      try {
        const { status } = await this._api.request(formData);
        if (status === 200) {
          const router = AppRouter.instance();
          router.go(PATH.MAIN, true);
        }

        if (status === 400) {
          throw new Error('reason text');
        }
      } catch (err) {
        if (err instanceof Error) {
          this._store.set(`signin.error`, err.message);
        }
      }
    }
  }
}
