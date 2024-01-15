import { Block, type IBlockProps } from 'shared/components/block';
import { ChatListWidget } from 'widgets/chat-list';
import { ChatWidget } from 'widgets/chat';
import { chatListController } from 'entites/chat';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface IPageMainProps extends IBlockProps {
  chatId?: string;
}

export class PageMain extends Block<IPageMainProps> {
  private _curChatId;

  constructor(props?: IPageMainProps) {
    const chatWidget = new ChatWidget();
    const chatListWidget = new ChatListWidget();

    super({ chatListWidget, chatWidget });

    const { chatId = '' } = { ...props };
    this._curChatId = chatId;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public didMount(): void {
    chatListController.start(this._curChatId);
  }

  public didUpdate(): void {
    chatListController.openChat(this._curChatId);
  }

  public setProps(newProps: Partial<IPageMainProps | IBlockProps>): void {
    if (typeof newProps.chatId === 'string') {
      this._curChatId = newProps.chatId;
    }

    super.setProps(newProps);
  }
}
