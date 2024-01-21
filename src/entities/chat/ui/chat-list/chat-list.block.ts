import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { createItems, createView, propsAdapter } from './_lib';
import templateSpec from './chat-list.template.hbs';
import styles from './chat-list.styles.module.css';

interface ChatListProps {
  chats: Block[];
}

const store = Store.instance();

export class ChatList extends Block<ChatListProps> {
  private readonly _viewMap = new Map<number, Block>();

  constructor() {
    const { chatList } = store.getState<TChatListState>();
    const chats = createItems(chatList);

    super({ chats });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected _onStoreUpdate = ({ chatList }: TChatListState): void => {
    const { chats, active } = chatList;
    const { id: activeChatId = null } = { ...active };

    const renderList = new Array<Block>(chats.length);
    let shouldReindex = chats.length !== this._viewMap.size;

    if (this._viewMap.size === 0) {
      chats.forEach((chatData, idx) => {
        const { id } = chatData;
        const view = createView(chatData, activeChatId);
        renderList[idx] = view;
        this._viewMap.set(id, view);
      });
    } else {
      chats.forEach((chatData, idx) => {
        const { id } = chatData;
        const indexedView = this._viewMap.get(id);
        if (!indexedView) {
          shouldReindex = true;
          renderList[idx] = createView(chatData, activeChatId);
        } else {
          indexedView.setProps(propsAdapter(chatData, activeChatId));
          renderList[idx] = indexedView;
        }
      });
    }

    if (shouldReindex) {
      this.setProps({ chats: renderList });
      this._viewMap.clear();
      chats.forEach((chatData, idx) => {
        const { id } = chatData;
        const view = renderList[idx];
        if (view) {
          this._viewMap.set(id, view);
        }
      });
    }
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
