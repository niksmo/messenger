import { Block } from 'shared/components/block';
import { ChatListWidget } from 'widgets/chat-list';
import { ChatWidget } from 'widgets/chat';
import { chatListController } from 'entites/chat/controller/chat-list.controller';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface MainPageProps {
  chatId?: string;
}

export class MainPage extends Block<MainPageProps> {
  private _curChatId;

  constructor(props: MainPageProps) {
    const chatWidget = new ChatWidget();
    const chatListWidget = new ChatListWidget();

    super({ chatListWidget, chatWidget });

    const { chatId = '' } = { ...props };
    this._curChatId = chatId;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public didMount(): void {
    chatListController.start(this._curChatId);
  }

  public didUpdate(): void {
    chatListController.openChat(this._curChatId);
  }

  public setProps(props: Partial<MainPageProps>): void {
    if (typeof props.chatId === 'string') {
      this._curChatId = props.chatId;
    }

    super.setProps(props);
  }
}
