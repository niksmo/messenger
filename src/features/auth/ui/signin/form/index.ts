import { Block, type IBlockProps } from 'shared/components/block';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputValue } from 'shared/helpers';
import { SigninController } from 'features/auth/controller';
import { Store } from 'shared/components/store';
import { SigninAPI } from 'features/auth/api';
import templateSpec from './form.template.hbs';

interface InputState {
  error: boolean;
  value: string;
  hint: string;
}

interface FormState {
  signin: {
    login: InputState;
    password: InputState;
    error: string;
  };
}

const initInputState: InputState = {
  error: false,
  hint: '',
  value: '',
};

interface ISigninFormProps extends IBlockProps {
  login: Block;
  password: Block;
  submitButton: Block;
  onInput: (e: Event) => void;
  onFocusout: (e: Event) => void;
  onSubmit: (e: Event) => void;
}

const verifier = {
  checkOnValidity(formData: Record<string, string>) {
    return {
      hintData: { login: 'asdfsf', password: 'adsfasdf' },
      isValid: false,
    };
  },
};

const signinController = new SigninController(verifier, new SigninAPI());

export class SigninForm extends Block<ISigninFormProps> {
  constructor() {
    const store = Store.instance();

    const login = new Input({
      id: 'login',
      name: 'login',
      type: 'text',
      placeholder: 'Login',
      ...initInputState,
    });

    const password = new Input({
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      ...initInputState,
    });

    const submitButton = new ButtonFilled({
      id: 'submitButton',
      name: 'submitButton',
      label: 'Sign in',
      type: 'submit',
    });

    store.on<FormState>((state) => {
      login.setProps({ ...state.signin.login });
      password.setProps({ ...state.signin.password });
    });

    super({
      login,
      password,
      submitButton,
      onInput: (e) => {
        signinController.input(getInputValue(e));
      },
      onFocusout: (e) => {
        signinController.verify(getFieldsValues(e));
      },
      onSubmit: (e) => {
        e.preventDefault();
        void signinController.submit(getFieldsValues(e));
      },
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
