import { Block, type IBlockProps } from 'shared/components/block';
import { DayMessages } from 'entites/message';
import data from 'shared/mock-data/messages.json';
import { Store } from 'shared/components/store';
import { type IChatListSlice } from 'entites/chat/model/chat-list.model';
import { ChatHeader } from 'entites/chat/ui/chat-header';
import { MessageSender } from 'features/send-message/ui/container';
import { ChatStub } from 'entites/chat/ui/chat-stub';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';

interface IChatProps extends IBlockProps {
  header: Block;
  messages: Block[];
  sender: Block;
}

const store = Store.instance();

export class ChatWidget extends Block<IChatProps> {
  private readonly _onStoreUpdate;

  constructor() {
    const { chatList } = store.getState<IChatListSlice>();
    const { currentChat } = { ...chatList };

    const messages = data.map((day) => {
      const { date, messages: messageList } = day;
      return new DayMessages({ date, messageList });
    });

    const header = new ChatHeader();

    const sender = new MessageSender();

    const chatStub = new ChatStub();

    super({
      isCurrentChat: Boolean(currentChat),
      chatStub,
      header,
      messages,
      sender,
    });

    this._onStoreUpdate = (state: IChatListSlice) => {
      const { chatList } = state;
      const { currentChat } = chatList;
      this.setProps({ isCurrentChat: Boolean(currentChat) });
    };

    store.on(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
