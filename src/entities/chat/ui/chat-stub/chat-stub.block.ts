import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { type TChatState } from 'entites/chat/model/chat.model';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import templateSpec from './chat-stub.template.hbs';
import styles from './styles.module.css';

interface ChatStubProps {
  load: boolean;
}

const store = Store.instance();

export class ChatStub extends Block<ChatStubProps> {
  constructor() {
    super({ load: true });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }

  private readonly _onStoreUpdate = ({
    chat,
    chatList,
  }: TChatState & TChatListState): void => {
    const { load: chatLoad } = chat;
    const { load: chatListLoad } = chatList;
    this.setProps({ load: chatListLoad || chatLoad });
  };
}
