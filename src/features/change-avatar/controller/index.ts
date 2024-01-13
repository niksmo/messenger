import { Store } from 'shared/components/store';
import { ChangeAvatarAPI } from '../api';
import { AppRouter } from 'shared/components/router';

export class ChangeAvatarController {
  private readonly _store;
  private readonly _api;
  private readonly _router;

  constructor() {
    this._store = Store.instance();
    this._api = new ChangeAvatarAPI();
    this._router = AppRouter.instance();
  }

  showImage(): void {
    // save file to store
    // route to avatar page
    // verify()
    //
  }

  verify(): void {
    // check file on validity: MIME/type, size
    // if error > render errors
    // return isCorrect
  }

  async updoad(): Promise<void> {
    // if verify() >
    // send formData
    // ... process success/errors
  }
}
