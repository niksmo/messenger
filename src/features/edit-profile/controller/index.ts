import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store';
import {
  HINT,
  TEMPLATE,
  verifierCreator,
} from 'shared/components/form-verifier';
import { ROUT_PATH } from 'shared/constants';
import { reviveNullToString } from 'shared/helpers';
import { type IViewerState } from 'entites/viewer/model';
import { EditProfileAPI } from '../api';
import { type IFieldState, type IEditProfileState } from '../model';

type TFormData = Record<string, string>;

type TInitFieldsState = Omit<IEditProfileState['editProfile'], 'load'>;

interface IInputData {
  field: string;
  value: string;
}

const STORE_SLICE = 'editProfile';
const STORE_LOAD = STORE_SLICE + '.load';

class EditProfileController {
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
    });

    this._api = new EditProfileAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  start(): void {
    const { viewer } = this._store.getState<IViewerState>();
    const { avatar, auth, id, ...initFieldsValues } = viewer;

    const initFieldsState = Object.entries(initFieldsValues).reduce<
      Record<string, IFieldState>
    >((map, [field, value]) => {
      map[field] = { value, error: false, hint: '' };
      return map;
    }, {}) as TInitFieldsState;

    const initState: IEditProfileState['editProfile'] = {
      ...initFieldsState,
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

    return isValid;
  }

  async submit(formData: TFormData): Promise<void> {
    if (!this.verify(formData)) {
      return;
    }

    try {
      this._store.set(STORE_LOAD, true);
      const { status, response } = await this._api.update(formData);

      if (status === 200) {
        if (typeof response === 'string') {
          const viewerData = JSON.parse(response, reviveNullToString);
          this._store.set('viewer', viewerData);
        }

        this._resetState();
        this._router.go(ROUT_PATH.SETTINGS);
      }

      if (status === 400) {
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

      if (status === 500) {
        this._router.go(ROUT_PATH[500]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this._store.set(STORE_LOAD, false);
    }
  }
}

const editProfileController = new EditProfileController();

export { editProfileController };
