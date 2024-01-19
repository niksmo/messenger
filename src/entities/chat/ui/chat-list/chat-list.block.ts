import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { createItems } from './_lib';
import templateSpec from './chat-list.template.hbs';

const store = Store.instance();

export class ChatList extends Block {
  constructor() {
    const { chatList } = store.getState<TChatListState>();
    const chats = createItems(chatList);

    super({ chats });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected _onStoreUpdate = ({ chatList }: TChatListState): void => {
    const chats = createItems(chatList);
    this.setProps({ chats });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
