import { Store } from 'shared/components/store';
import { AppRouter } from 'shared/components/router';
import { ChatUsersAPI } from '../api';

export class AddChatUsersController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new ChatUsersAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }
}
