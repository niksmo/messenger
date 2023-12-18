import { Block, BlockInput, IBlockProps } from 'shared/components/block';
import templateSpec from './form.template.hbs';

interface IEditProfileFormProps {
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

export class EditProfileForm extends Block {
  constructor(props: IEditProfileFormProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<IEditProfileFormProps>) {
    super.setProps(newProps);
  }
}
