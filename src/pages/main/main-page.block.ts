import { Block } from 'shared/components/block/block';
import { chatListController } from 'entites/chat/controller/chat-list.controller';
import { ChatListWidget } from 'widgets/chat-list/chat-list.block';
import { ChatWidget } from 'widgets/chat/chat-widget.block';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';
import { chatController } from 'entites/chat/controller/chat.controller';

interface MainPageProps {
  chatListWidget: Block;
  chatWidget: Block;
}

export class MainPage extends Block<MainPageProps> {
  constructor() {
    const chatListWidget = new ChatListWidget();
    const chatWidget = new ChatWidget();

    super({ chatListWidget, chatWidget });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public didMount(): void {
    chatListController.start();
    chatController.start();
  }
}
