import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { chatListController } from 'entites/chat/controller/chat-list.controller';
import { createItems } from './_lib';
import templateSpec from './chat-list.template.hbs';
// import styles from './styles.module.css';

const store = Store.instance();

export class ChatList extends Block {
  constructor() {
    const state = store.getState<TChatListState>();
    const chats = createItems(state);

    super({ chats });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  // protected getStylesModuleHook(): CSSModuleClasses {
  //   return styles;
  // }

  protected _onStoreUpdate = (state: TChatListState): void => {
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
