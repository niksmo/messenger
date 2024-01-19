import { Block } from 'shared/components/block/block';
// import { DayMessages } from 'entites/message';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { ChatHeader } from 'entites/chat/ui/chat-header/chat-header.block';
import { ChatStub } from 'entites/chat/ui/chat-stub/chat-stub.block';
import { chatUsersController } from 'entites/chat-user/controller/chat-users.controller';
import { MessageSender } from 'features/send-message/ui/container';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';

interface ChatWidgetProps {
  header: Block;
  // messages: Block[];
  sender: Block;
  isCurrentChat: boolean;
  chatStub: Block;
}

const store = Store.instance();

export class ChatWidget extends Block<ChatWidgetProps> {
  constructor() {
    const { currentChat, load } = store.getState<TChatListState>().chatList;

    // const messages = data.map((day) => {
    //   const { date, messages: messageList } = day;
    //   return new DayMessages({ date, messageList });
    // });

    const header = new ChatHeader();

    const sender = new MessageSender();

    const chatStub = new ChatStub({ load });

    super({
      isCurrentChat: Boolean(currentChat),
      chatStub,
      header,
      // messages,
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
    void chatUsersController.getChatUsers();
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }

  private readonly _onStoreUpdate = (state: TChatListState): void => {
    const { chatList } = state;
    const { currentChat, load } = chatList;
    this.setProps({ isCurrentChat: !load && Boolean(currentChat) });
  };
}
