import { Block, type IBlockProps } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputValue } from 'shared/helpers';
import { type SigninState } from 'features/auth/model';
import { signinController } from 'features/auth/controller';
import templateSpec from './form.template.hbs';

interface ISigninFormProps extends IBlockProps {
  login: Block;
  password: Block;
  submitButton: Block;
  onInput: (e: Event) => void;
  onFocusout: (e: Event) => void;
  onSubmit: (e: Event) => void;
}

export class SigninForm extends Block<ISigninFormProps> {
  constructor() {
    const store = Store.instance();

    const login = new Input({
      id: 'login',
      name: 'login',
      type: 'text',
      placeholder: 'Login',
    });

    const password = new Input({
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
    });

    const submitButton = new ButtonFilled({
      label: 'Sign in',
      type: 'submit',
    });

    store.on<SigninState>((state) => {
      const { signin } = state;
      login.setProps({ ...signin.login });
      password.setProps({ ...signin.password });
      submitButton.setProps({ disabled: signin.load });
    });

    signinController.initBlock();

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
