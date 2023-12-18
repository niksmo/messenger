import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './container.template.hbs';
import styles from './styles.module.css';

interface IMessageSenderProps {
  menu: Block;
  form: Block;
}

export class MessageSender extends Block {
  constructor(props: IMessageSenderProps & IBlockProps) {
    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
