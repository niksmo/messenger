import { Block, BlockInput, IBlockProps } from 'shared/components/block';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface IMessageFormProps {
  input: BlockInput;
  submitButton: Block;
  onInput?(e: Event): void;
  onSubmit?(e: Event): void;
}

export class MessageForm extends Block {
  constructor(props: IMessageFormProps & IBlockProps) {
    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
  public setProps(newProps: Partial<IMessageFormProps>): void {
    super.setProps(newProps);
  }
}
