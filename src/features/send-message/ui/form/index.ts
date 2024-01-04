import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface IMessageFormProps extends IBlockProps {
  input: BlockInput;
  submitButton: Block;
  onInput?: (e: Event) => void;
  onSubmit?: (e: Event) => void;
}

export class MessageForm extends Block<IMessageFormProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
