import { Block, type IBlockProps } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { Input } from 'shared/ui/input';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputValue } from 'shared/helpers';
import { type ISigninState } from 'features/auth/model';
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

const store = Store.instance();

export class SigninForm extends Block<ISigninFormProps> {
  private readonly _onStoreUpdate;

  constructor() {
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

    this._onStoreUpdate = (state: ISigninState) => {
      const { signin } = state;
      login.setProps({ ...signin.login });
      password.setProps({ ...signin.password });
      submitButton.setProps({ disabled: signin.load });
    };

    store.on<ISigninState>(this._onStoreUpdate);

    signinController.initBlock();
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
