import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router';
import { HINT, verifierCreator } from 'shared/components/form-verifier';
import { ROUTE_PATH } from 'shared/constants';
import { goToLoginWithUnauth, reviveNullToString } from 'shared/helpers';
import type {
  TChangeAvatarSlice,
  TChangeAvatarState,
} from '../model/change-avatar.model';
import { ChangeAvatarAPI } from '../api/change-avatar.api';

const STORE_SLICE = 'changeAvatar';
const MAX_SIZE_1MB = Math.pow(2, 20) - 1;

function makeState(file: File): TChangeAvatarState {
  return {
    objectURL: URL.createObjectURL(file),
    load: false,
    error: '',
  };
}

export class ChangeAvatarController {
  private readonly _store;
  private readonly _api;
  private readonly _router;
  private readonly _verifier;
  private _fileImage: File | null = null;

  constructor() {
    this._store = Store.instance();
    this._api = new ChangeAvatarAPI();
    this._router = AppRouter.instance();
    this._verifier = verifierCreator.makeFileVerifier({
      size: { max: MAX_SIZE_1MB, hint: HINT.fileMaxSize },
      type: {
        access: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        hint: HINT.fileType,
      },
    });
  }

  preview(file: File): void {
    this._fileImage = file;
    const state = makeState(file);
    this._store.set(STORE_SLICE, state);

    this._verify();

    this._router.go(ROUTE_PATH.CHANGE_AVATAR);
  }

  override(file: File): void {
    this._fileImage = file;
    const { changeAvatar: state } = this._store.getState<TChangeAvatarSlice>();
    const { objectURL } = { ...state };

    const newState = makeState(file);
    this._store.set(STORE_SLICE, newState);

    this._verify();

    URL.revokeObjectURL(objectURL);
  }

  reset(): void {
    const state: TChangeAvatarState = {
      objectURL: '',
      load: false,
      error: '',
    };
    this._store.set(STORE_SLICE, state);
  }

  private _verify(): boolean {
    if (!this._fileImage) {
      this._store.set(STORE_SLICE, { error: 'Pick the image file' });
      return false;
    }
    const { isValid, hint } = this._verifier.checkOnValidity(this._fileImage);
    this._store.set(STORE_SLICE, { error: hint });
    return isValid;
  }

  async upload(): Promise<void> {
    if (!this._verify() || !this._fileImage) {
      return;
    }

    this._store.set(STORE_SLICE, { load: true });

    const formData = new FormData();
    formData.append('avatar', this._fileImage);

    try {
      const xhr = await this._api.update(formData);
      const { status, response } = xhr;

      if (status === 400 && typeof response === 'string') {
        const { reason } = JSON.parse(response);
        this._store.set(STORE_SLICE, { error: reason });
        return;
      }

      if (status === 200 && typeof response === 'string') {
        this._store.set('viewer', JSON.parse(response, reviveNullToString));
        this._router.go(ROUTE_PATH.SETTINGS);
      }

      if (status === 401) {
        goToLoginWithUnauth();
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
      }

      this.reset();
    } catch (err) {
      this._store.set(STORE_SLICE, { error: 'Image is too large' });
    } finally {
      this._store.set(STORE_SLICE, { load: false });
    }
  }
}

const changeAvatarController = new ChangeAvatarController();

export { changeAvatarController };
