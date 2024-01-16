import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getInputMap } from 'shared/helpers';
import { type TSigninState } from '../../../model/signin.model';
import { signinController } from '../../../controller/signin.controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class SigninForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    signinController.start();

    const { signin } = store.getState<TSigninState>();
    const { fields: fieldsState } = signin;

    const inputMap = getInputMap(fieldsParams, fieldsState);

    const submitButton = new ButtonFilled({
      label: 'Sign in',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        signinController.input(e);
      },
      onFocusout: () => {
        signinController.verify();
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        signinController.submit();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: TSigninState): void => {
    const { load, fields } = state.signin;

    Object.entries(fields).forEach(([field, props]) => {
      const block = this._inputMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
