import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface IEditProfileFormProps extends IBlockProps {
  first_name: BlockInput;
  second_name: BlockInput;
  email: BlockInput;
  phone: BlockInput;
  login: BlockInput;
  display_name: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class EditProfileForm extends Block<IEditProfileFormProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
