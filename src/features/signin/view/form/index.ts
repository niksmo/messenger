import { Block, IBlockProps } from '../../../../shared/ui/block';
import { Button } from '../../../../shared/ui/button';
import { Input } from '../../../../shared/ui/input';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface ISigninFormProps {
  loginField: Input;
  pwdField: Input;
  submitButton: Button;
  onSubmit?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

type TField = 'login' | 'password';

type TFieldBlock = Record<TField, Input | null>;

type TFieldValue = Record<TField, string>;

export class SigninForm extends Block {
  private _field: TFieldBlock = {
    login: null,
    password: null,
  };
  private _submitButton: Button;
  private _fieldValue: TFieldValue = {
    login: '',
    password: '',
  };
  private _outerSubmitCb: ((arg: TFieldValue) => void) | null = null;
  private _outerBlurCb: ((arg: TFieldValue) => void) | null = null;
  private _outerInputCb: ((arg: Partial<TFieldValue>) => void) | null = null;

  constructor() {
    const props: ISigninFormProps & IBlockProps = {
      loginField: new Input({
        id: 'login',
        name: 'login',
        placeholder: 'Login',
        type: 'text',
        value: '',
        error: false,
      }),

      pwdField: new Input({
        id: 'password',
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        value: '',
        error: false,
      }),

      submitButton: new Button({
        type: 'submit',
        label: 'Signin',
        look: 'filled',
      }),
    };

    super(props, styles);
    this._field.login = props.loginField;
    this._field.password = props.pwdField;
    this._submitButton = props.submitButton;

    this.setProps({
      onInput: this._onInput.bind(this),
      onBlur: this._onBlur.bind(this),
      onSubmit: this._onSubmit.bind(this),
    });
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  private _onInput(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;
      if (name in this._fieldValue) {
        const fieldName = name as TField;
        this._fieldValue[fieldName] = value;

        this._field[fieldName]?.setProps({ error: false, value: value });

        if (this._outerInputCb) {
          this._outerInputCb({ [fieldName]: value });
        }
      }
    }
  }

  private _onBlur() {
    if (this._outerBlurCb) {
      this._outerBlurCb(this._fieldValue);
    }
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    if (this._outerSubmitCb) {
      this._outerSubmitCb(this._fieldValue);
    }
  }

  public showLoading(isLoading: boolean) {
    this._submitButton.setProps({ load: isLoading });
  }

  public showErrors(obj: Record<TField, string>) {
    const entries = Object.entries(obj) as unknown as [TField, string][];

    entries.forEach(([fName, support]) => {
      this._field[fName]?.setProps({ error: true, support });
    });
  }

  public addListener(
    type: 'submit' | 'input' | 'blur',
    cb: (formData: Partial<TFieldValue>) => void
  ): void {
    if (type === 'submit') {
      this._outerSubmitCb = cb;
      return;
    }

    if (type === 'blur') {
      this._outerBlurCb = cb;
      return;
    }

    if (type === 'input') {
      this._outerInputCb = cb;
      return;
    }
  }

  public getValues() {
    return this._fieldValue;
  }
}
