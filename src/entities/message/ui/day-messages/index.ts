import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './day-messages.template.hbs';
import styles from './styles.module.css';

interface IDayMessagesProps {
  date: string;
  messages: Block[];
}

export class DayMessages extends Block {
  constructor(props: IDayMessagesProps & IBlockProps) {
    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
  public setProps(newProps: Partial<IDayMessagesProps>): void {
    super.setProps(newProps);
  }
}
