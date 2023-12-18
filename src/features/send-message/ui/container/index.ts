import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './container.template.hbs';
import styles from './styles.module.css';

interface IMessageSenderProps extends IBlockProps {
  menu: Block;
  form: Block;
}

export class MessageSender extends Block<IMessageSenderProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
