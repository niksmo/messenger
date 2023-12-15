import { Block, BlockInput, IBlockProps } from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface ISignupFormProps {
  first_name: BlockInput;
  second_name: BlockInput;
  email: BlockInput;
  phone: BlockInput;
  login: BlockInput;
  password: BlockInput;
  confirm: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class SignupForm extends Block {
  constructor(props: ISignupFormProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<ISignupFormProps>) {
    super.setProps(newProps);
  }
}
