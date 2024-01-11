import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './form.template.hbs';
import { Input } from 'shared/ui/input';

interface ISignupFormProps extends IBlockProps {
  first_name: Block;
  second_name: Block;
  email: Block;
  phone: Block;
  login: Block;
  password: Block;
  confirm: Block;
  submitButton: Block;
  onSubmit: (e: Event) => void;
  onInput: (e: Event) => void;
  onFocusout: (e: Event) => void;
}

export class SignupForm extends Block<ISignupFormProps> {
  constructor() {
    const inputMap = {
      first_name: new Input({
        id: 'first_name',
        name: 'first_name',
        placeholder: 'First name',
        type: 'text',
      }),
      second_name: new Input({
        id: 'second_name',
        name: 'second_name',
        placeholder: 'Last name',
        type: 'text',
      }),
      email: new Input({
        id: 'email',
        name: 'email',
        placeholder: 'Email',
        type: 'text',
      }),
      phone: new Input({
        id: 'phone',
        name: 'phone',
        placeholder: 'Phone',
        type: 'text',
      }),
      login: new Input({
        id: 'login',
        name: 'login',
        placeholder: 'Login',
        type: 'text',
      }),
      password: new Input({
        id: 'password',
        name: 'password',
        placeholder: 'Password',
        type: 'password',
      }),
      confirm: new Input({
        id: 'confirm',
        name: 'confirm',
        placeholder: 'Confirm password',
        type: 'password',
      }),
    };

    super({ ...inputMap });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
