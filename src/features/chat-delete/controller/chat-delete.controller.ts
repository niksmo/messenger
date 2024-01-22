import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { DeleteChatAPI } from '../api/chat-delete.api';
import type { TChatListState } from 'entites/chat/model/chat-list.model';
import { ROUTE_PATH } from 'shared/constants/routes';

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
      const { status } = await this._api.delete(active.id);

      if (status === 200) {
        const { chats, active } =
          this._store.getState<TChatListState>().chatList;

        const filteredChats = chats.filter(
          (chatData) => chatData.id !== active?.id
        );

        this._store.set('chatList', { active: null, chats: filteredChats });
        return;
      }

      if (status === 400) {
        throw Error('Delete chat: 400 (bad request)');
      }

      if (status === 401) {
        this._store.set('viewer', { auth: false });
        return;
      }

      if (status === 403) {
        throw Error('Delete chat: forbidden');
      }

      if (status === 500) {
        this._router.go(ROUTE_PATH[500]);
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
