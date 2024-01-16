import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import { type ISigninState } from '../../../model';
import { signinController } from '../../../controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class SigninForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    signinController.start();

    const { signin } = store.getState<ISigninState>();
    const { error, load, ...inputsState } = signin;

    const inputMap = getInputMap(fieldsParams, inputsState);

    const submitButton = new ButtonFilled({
      label: 'Sign in',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        signinController.input(getInputValue(e));
      },
      onFocusout: (e: Event) => {
        signinController.verify(getFieldsValues(e));
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        void signinController.submit(getFieldsValues(e));
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: ISigninState): void => {
    const { load, error, ...fields } = state.signin;

    Object.entries(fields).forEach(([field, props]) => {
      const block = this._inputMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on<ISigninState>(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
