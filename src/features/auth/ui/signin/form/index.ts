import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface ISigninFormProps extends IBlockProps {
  login: BlockInput;
  password: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class SigninForm extends Block<ISigninFormProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
