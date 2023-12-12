import { BlockInput } from '../../../../shared/components/block';
import { Block, IBlockProps } from '../../../../shared/components/block/block';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface ISigninFormProps {
  login: BlockInput;
  password: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export class SigninForm extends Block {
  constructor(props: ISigninFormProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  protected _getStylesModule() {
    return styles;
  }

  public setProps(newProps: Partial<ISigninFormProps>) {
    super.setProps(newProps);
  }
}
