import { Block, type IBlockProps } from 'shared/components/block';
import { ChatListWidget } from 'widgets/chat-list';
import { ChatWidget } from 'widgets/chat';
import { chatListController } from 'entites/chat';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface IPageMainProps extends IBlockProps {
  chatId: string;
}

export class PageMain extends Block<IPageMainProps> {
  constructor(props: { chatId: string }) {
    const { chatId } = props;

    chatListController.openChat(chatId);

    const chatWidget = new ChatWidget();
    const chatListWidget = new ChatListWidget();

    super({ chatListWidget, chatWidget });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps({ chatId }: IPageMainProps): void {
    chatListController.openChat(chatId);
  }
}
