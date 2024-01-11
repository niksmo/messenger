import { Block, type IBlockProps } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputValue } from 'shared/helpers';
import { signupController } from 'features/auth/controller';
import { type ISignupState } from 'features/auth/model';
import templateSpec from './form.template.hbs';

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
    const store = Store.instance();

    const inputMap: Record<string, Block> = {
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

    const submitButton = new ButtonFilled({
      label: 'Sign up',
      type: 'submit',
    });

    store.on<ISignupState>((state) => {
      const { load, ...fields } = state.signup;
      Object.entries(fields).forEach(([field, props]) => {
        const block = inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      });

      submitButton.setProps({ disabled: load });
    });

    signupController.initBlock();

    super({
      ...inputMap,
      submitButton,
      onInput: (e) => {
        signupController.input(getInputValue(e));
      },
      onFocusout: (e) => {
        signupController.verify(getFieldsValues(e));
      },
      onSubmit: (e) => {
        e.preventDefault();
        void signupController.submit(getFieldsValues(e));
      },
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
