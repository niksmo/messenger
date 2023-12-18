import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface ISignupFormProps extends IBlockProps {
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

export class SignupForm extends Block<ISignupFormProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
