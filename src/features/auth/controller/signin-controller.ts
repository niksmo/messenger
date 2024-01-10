import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import { PATH } from 'shared/constants';

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

  input({ field, value }: IInputData): void {
    this._store.set(`signin.${field}`, { value, error: false });
    this._store.set('signin.error', '');
  }

  verify(formData: TFormData): boolean {
    const { isValid, hintData } = this._verifier.checkOnValidity(formData);

    if (!isValid) {
      for (const field of Object.keys(hintData)) {
        const hint = hintData[field];
        if (hint) {
          this._store.set(`signin.${field}`, {
            hint,
            error: true,
          });
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
