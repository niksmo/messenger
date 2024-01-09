import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import { Store } from 'shared/components/store';
import { SigninController } from 'features/auth/controller';
import { SigninAPI } from 'features/auth/api';

interface ISigninFormProps extends IBlockProps {
  login: BlockInput;
  password: BlockInput;
  submitButton: Block;
  onSubmit: (e: Event) => void;
}

interface InputState {
  error: boolean;
  value: string;
  support: string;
}

interface FormState {
  signin: {
    login: InputState;
    password: InputState;
    error: string;
  };
}

const verifier = {
  checkOnValidity(formData: Record<string, string>) {
    return {
      hintData: { login: '', password: '' },
      isValid: true,
    };
  },
};

const signinController = new SigninController(verifier, new SigninAPI());

export class SigninForm extends Block<ISigninFormProps> {
  constructor() {
    const store = Store.instance();

    const login = new Input({
      placeholder: 'Login',
      error: false,
      support: '',
      value: '',
      name: 'login',
      id: 'login',
      type: 'text',
      onInput: (e) => {
        const { currentTarget } = e;
        if (currentTarget instanceof HTMLInputElement) {
          const { name, value } = currentTarget;
          signinController.input(name, value);
        }
      },
      onBlur: () => {
        signinController.verify({
          login: login.getValue(),
          password: password.getValue(),
        });
      },
    });

    const password = new Input({
      placeholder: 'Password',
      error: false,
      support: '',
      value: '',
      name: 'password',
      id: 'password',
      type: 'password',
      onInput: (e) => {
        const { currentTarget } = e;
        if (currentTarget instanceof HTMLInputElement) {
          const { name, value } = currentTarget;
          signinController.input(name, value);
        }
      },
      onBlur: () => {
        signinController.verify({
          login: login.getValue(),
          password: password.getValue(),
        });
      },
    });

    const submitButton = new ButtonFilled({
      label: 'Sign in',
      type: 'submit',
      id: 'submitButton',
    });

    store.on<FormState>((state) => {
      login.setProps({ ...state.signin.login });
      password.setProps({ ...state.signin.password });
    });

    super({
      login,
      password,
      submitButton,
      onSubmit: (e) => {
        e.preventDefault();
        void signinController.submit({
          login: login.getValue(),
          password: password.getValue(),
        });
      },
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
