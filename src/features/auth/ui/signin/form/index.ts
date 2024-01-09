import {
  Block,
  type BlockInput,
  type IBlockProps,
} from 'shared/components/block';
import templateSpec from './form.template.hbs';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import { Store } from 'shared/components/store';

interface ISigninFormProps extends IBlockProps {
  login: BlockInput;
  password: BlockInput;
  submitButton: Block;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
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
  };
}

export class SigninForm extends Block<ISigninFormProps> {
  constructor() {
    const store = Store.instance();

    const login = new Input({
      placeholder: 'Login',
      error: false,
      support: '',
      value: '',
      name: 'login',
      type: 'text',
    });

    const password = new Input({
      placeholder: 'Password',
      error: false,
      support: '',
      value: '',
      name: 'password',
      type: 'password',
    });

    const submitButton = new ButtonFilled({ label: 'Signin' });

    store.on<FormState>((state) => {
      login.setProps({ ...state.signin.login });
    });

    super({ login, password, submitButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
