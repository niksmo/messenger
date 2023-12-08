import { SigninMessage, SigninForm } from '..';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

interface Verifier {
  setConfig: (config: any) => void;
  validate: () => void;
}

export class SigninController {
  _fields = new Map<'login' | 'password', Input>();
  _form;
  _message;
  _loginValue = '';
  _passwordValue = '';
  constructor(private readonly verifier?: Verifier) {
    const self = this;

    this._fields.set(
      'login',
      new Input({
        id: 'login',
        name: 'login',
        placeholder: 'Login',
        type: 'text',
        error: false,
        value: self._loginValue,
      })
    );

    this._fields.set(
      'password',
      new Input({
        id: 'password',
        name: 'password',
        placeholder: 'Password',
        type: 'text',
        error: false,
        value: self._passwordValue,
      })
    );

    const submitButton = new Button({
      label: 'Sign in',
      look: 'filled',
      type: 'submit',
    });

    this._form = new SigninForm({
      loginField: this._fields.get('login') as Input,
      pwdField: this._fields.get('password') as Input,
      submitButton,
      input: this._onInput.bind(this),
      submit: this._onSubmit.bind(this),
    });

    this._message = new SigninMessage({
      visible: false,
    });
  }

  public configVerifier(config: any) {
    if (this.verifier) {
      this.verifier.setConfig(config);
    }
  }

  public getFormContent() {
    return this._form.getContent();
  }

  private _checkValidity(e: Event): null | Map<'login' | 'password', string> {
    return new Map<'login' | 'password', string>([
      ['login', 'hey error'],
      ['password', 'error again'],
    ]);
  }

  private _showErrors(validityResult: Map<'login' | 'password', string>) {
    [...validityResult.entries()].forEach(([field, support]) => {
      const inputBlock = this._fields.get(field);
      const value = field === 'login' ? this._loginValue : this._passwordValue;
      if (inputBlock) {
        inputBlock.setProps({ error: true, support, value });
      }
    });
  }

  private _onSubmit(e: Event) {
    e.preventDefault();

    const result = this._checkValidity(e);

    if (result) {
      this._showErrors(result);
      return;
    }
  }

  private _onInput(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;

      if (name === 'login') {
        this._loginValue = value;
        const inputField = this._fields.get(name);
        inputField &&
          inputField.setProps({ error: false, value: this._loginValue });
      }

      if (name === 'password') {
        this._passwordValue = value;
        const inputField = this._fields.get(name);
        inputField &&
          inputField.setProps({ error: false, value: this._passwordValue });
      }
    }
  }

  private _showMessage() {
    this._message.setProps({ visible: true });
  }
}
