import { Block, type IBlockProps } from 'shared/components/block';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import templateSpec from './form.template.hbs';

interface IEditProfileFormProps extends IBlockProps {
  first_name: Block;
  second_name: Block;
  email: Block;
  phone: Block;
  login: Block;
  display_name: Block;
  submitButton: Block;
  onInput: (e: Event) => void;
  onFocusout: (e: Event) => void;
  onSubmit: (e: Event) => void;
}

export class EditProfileForm extends Block<IEditProfileFormProps> {
  constructor() {
    const inputMap = {
      first_name: new Input({
        id: 'first_name',
        name: 'first_name',
        placeholder: 'First name',
        type: 'text',
        error: false,
        value: '',
      }),
      second_name: new Input({
        id: 'second_name',
        name: 'second_name',
        placeholder: 'Last name',
        type: 'text',
        error: false,
        value: '',
      }),
      email: new Input({
        id: 'email',
        name: 'email',
        placeholder: 'Email',
        type: 'text',
        error: false,
        value: '',
      }),
      phone: new Input({
        id: 'phone',
        name: 'phone',
        placeholder: 'Phone',
        type: 'text',
        error: false,
        value: '',
      }),
      login: new Input({
        id: 'login',
        name: 'login',
        placeholder: 'Login',
        type: 'text',
        error: false,
        value: '',
      }),
      display_name: new Input({
        id: 'display_name',
        name: 'display_name',
        placeholder: 'Username',
        type: 'text',
        error: false,
        value: '',
      }),
    };

    const submitButton = new ButtonFilled({
      type: 'submit',
      label: 'Save',
      name: 'saveButton',
    });

    super({ ...inputMap, submitButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
