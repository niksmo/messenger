import { Block, type IBlockProps } from 'shared/components/block';
import { ChatList } from 'widgets/chat-list';
import { Chat } from 'widgets/chat/ui';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface IPageMainProps extends IBlockProps {
  chatListWidget: Block;
  chatWidget: Block;
}

export class PageMain extends Block<IPageMainProps> {
  constructor() {
    super({ chatListWidget: new ChatList(), chatWidget: new Chat() });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
