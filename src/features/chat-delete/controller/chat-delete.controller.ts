import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { DeleteChatAPI } from '../api/chat-delete.api';
import type { TChatListState } from 'entites/chat/model/chat-list.model';

class DeleteChatController {
  private readonly _api;
  private readonly _store;
  private readonly _router;

  constructor() {
    this._api = new DeleteChatAPI();
    this._store = Store.instance();
    this._router = AppRouter.instance();
  }

  private async _deleteChat(): Promise<void> {
    const { active } = this._store.getState<TChatListState>().chatList;

    if (!active) {
      return;
    }

    try {
      const { status, response } = await this._api.delete(active.id);

      if (status === 200) {
        // filter chatList
        // set active to null
        // route to main
      }

      if (status === 400) {
        // throw error
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
      }

      if (status === 403) {
        // throw error
      }

      if (status === 500) {
        // route to 500
      }
    } catch (err) {
      console.warn(err);
    }
  }

  public deleteChat(): void {
    void this._deleteChat();
  }
}

const deleteChatController = new DeleteChatController();

export { deleteChatController };
