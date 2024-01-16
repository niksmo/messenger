import { Block } from 'shared/components/block';
import templateSpec from './chat-list.template.hbs';
import styles from './styles.module.css';
import { Store } from 'shared/components/store';
import { createItems } from './lib';
import { type IChatListSlice } from 'entites/chat/model/chat-list.model';
import { chatListController } from 'entites/chat/controller/chat-list.controller';

const store = Store.instance();

export class ChatList extends Block {
  constructor() {
    const state = store.getState<IChatListSlice>();
    const chats = createItems(state);

    super({ chats });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected _onStoreUpdate = (state: IChatListSlice): void => {
    const chats = createItems(state);
    this.setProps({ chats });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
    void chatListController.requestChats();
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
