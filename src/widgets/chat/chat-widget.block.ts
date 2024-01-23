import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { ChatHeader } from 'entites/chat/ui/chat-header/chat-header.block';
import { ChatStub } from 'entites/chat/ui/chat-stub/chat-stub.block';
import { MessageSender } from 'features/send-message/ui/message-sender/message-sender.block';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';
import { MessageList } from 'entites/message/ui/message-list/message-list.block';

interface ChatWidgetProps {
  chatStub: Block;
  header: Block;
  messageList: Block;
  sender: Block;
  isActiveChat: boolean;
}

const store = Store.instance();

export class ChatWidget extends Block<ChatWidgetProps> {
  constructor() {
    const { active } = store.getState<TChatListState>().chatList;

    const chatStub = new ChatStub();
    const header = new ChatHeader();
    const messageList = new MessageList();
    const sender = new MessageSender();

    super({
      isActiveChat: Boolean(active),
      chatStub,
      header,
      messageList,
      sender,
    });
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

  private readonly _onStoreUpdate = (state: TChatListState): void => {
    const { load, active } = state.chatList;
    this.setProps({ isActiveChat: !load && active });
  };
}
