import { Block, IBlockProps } from '../../../../shared/ui/block';
import { Button } from '../../../../shared/ui/button';
import { Input } from '../../../../shared/ui/input';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface ISigninFormProps extends IBlockProps {
  loginField: Input;
  pwdField: Input;
  submitButton: Button;
  submit: (e: Event) => void;
  input?: (e: Event) => void;
  blur?: (e: Event) => void;
}

export class SigninForm extends Block {
  constructor(props: ISigninFormProps) {
    super(props, styles);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<ISigninFormProps>) {
    super.setProps(newProps);
  }
}
