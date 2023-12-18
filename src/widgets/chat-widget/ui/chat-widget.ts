import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';

interface IChatWidgetProps extends IBlockProps {
  header: Block;
  messages: Block[];
  sender: Block;
}

export class ChatWidget extends Block<IChatWidgetProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
