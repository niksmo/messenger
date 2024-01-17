import { Block } from 'shared/components/block';
// import { DayMessages } from 'entites/message';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import { ChatHeader } from 'entites/chat/ui/chat-header';
import { MessageSender } from 'features/send-message/ui/container';
import { ChatStub } from 'entites/chat/ui/chat-stub';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';
import { chatUsersController } from 'entites/chat-user/controller/chat-users.controller';
import { withInterrupt } from 'shared/helpers';

interface ChatWidgetProps {
  header: Block;
  // messages: Block[];
  sender: Block;
  isCurrentChat: boolean;
  chatStub: Block;
}

const store = Store.instance();

const getChatUsersWithInterrupt = withInterrupt(
  chatUsersController.getChatUsers.bind(chatUsersController)
);

export class ChatWidget extends Block<ChatWidgetProps> {
  constructor() {
    const { chatList } = store.getState<TChatListState>();
    const { currentChat } = { ...chatList };

    // const messages = data.map((day) => {
    //   const { date, messages: messageList } = day;
    //   return new DayMessages({ date, messageList });
    // });

    const header = new ChatHeader();

    const sender = new MessageSender();

    const chatStub = new ChatStub();

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
    getChatUsersWithInterrupt();
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }

  private readonly _onStoreUpdate = (state: TChatListState): void => {
    const { chatList } = state;
    const { currentChat } = chatList;
    this.setProps({ isCurrentChat: Boolean(currentChat) });
  };
}
