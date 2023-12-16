import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';

interface IChatWidgetProps {
  header: Block;
  messages: Block[];
  sender: Block;
}

export class ChatWidget extends Block {
  constructor(props: IChatWidgetProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IChatWidgetProps>): void {
    super.setProps(newProps);
  }
}
