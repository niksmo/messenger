import { AppRouter } from 'shared/components/router/router';
import { Store } from 'shared/components/store/store';
import { verifierCreator } from 'shared/components/form-verifier/verifier';
import { HINT, TEMPLATE } from 'shared/components/form-verifier/templates';
import { ROUTE_PATH } from 'shared/constants/routes';
import { getInputValue } from 'shared/helpers/get';
import { reviveNullToString } from 'shared/helpers/json';
import { type TViewerState } from 'entites/viewer/model/viewer.model';
import { EditProfileAPI } from '../api/edit-profile.api';
import type {
  TEditProfileState,
  TInputState,
} from '../model/edit-profile.model';

const STORE_SLICE = 'editProfile';
const STORE_FIELDS = STORE_SLICE + '.fields';
const STORE_LOAD = STORE_SLICE + '.load';

class EditProfileController {
  private readonly _verifier;
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new EditProfileAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();

    this._verifier = verifierCreator.makeStringVerifier({
      first_name: { template: TEMPLATE.name, hint: HINT.name },
      second_name: { template: TEMPLATE.name, hint: HINT.name },
      email: { template: TEMPLATE.email, hint: HINT.email },
      phone: { template: TEMPLATE.phone, hint: HINT.phone },
      login: { template: TEMPLATE.login, hint: HINT.login },
    });
  }

  start(formEl?: HTMLElement): void {
    const { viewer } = this._store.getState<TViewerState>();
    const { avatar, auth, id, fetching, ...viewerData } = viewer;

    const fields: Record<string, TInputState> = {};

    Object.entries(viewerData).reduce((indexed, [field, paramValue]) => {
      indexed[field] = { value: paramValue, error: false, hint: '' };

      if (formEl instanceof HTMLFormElement) {
        const formElements = formEl.elements as unknown as Record<
          string,
          HTMLInputElement
        >;

        const DOMField = formElements[field];
        if (DOMField) {
          DOMField.value = paramValue;
        }
      }

      return indexed;
    }, fields);

    this._store.set(STORE_SLICE, { fields, load: false });
  }

  private _extractFormData(): Record<string, string> {
    const { editProfile } = this._store.getState<TEditProfileState>();
    const { fields } = editProfile;

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
      const { status, response } = await this._api.update(formData);

      if (status === 200) {
        if (typeof response === 'string') {
          const viewerData = JSON.parse(response, reviveNullToString);
          this._store.set('viewer', viewerData);
        }
        this.start();
        this._router.go(ROUTE_PATH.SETTINGS);
        return;
      }

      if (status === 400) {
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

const editProfileController = new EditProfileController();

export { editProfileController };
