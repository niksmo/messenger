import { Block, IBlockProps } from '../../../../shared/ui/block';
import { Button } from '../../../../shared/ui/button';
import { Input } from '../../../../shared/ui/input';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface ISigninFormProps {
  loginField: Input;
  passwordField: Input;
  submitButton: Button;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export class SigninForm extends Block {
  constructor(props: ISigninFormProps & IBlockProps) {
    super(props, styles);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public setProps(newProps: Partial<ISigninFormProps>): void {
    super.setProps(newProps);
  }
}
