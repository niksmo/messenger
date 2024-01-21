import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface IChangePasswordFormProps extends IBlockProps {
  current_password: BlockInput;
  new_password: BlockInput;
  confirm: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class ChangePasswordForm extends Block<IChangePasswordFormProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
