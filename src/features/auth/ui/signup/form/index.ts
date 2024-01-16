import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getInputMap } from 'shared/helpers';
import { type TSignupState } from '../../../model/signup.model';
import { signupController } from '../../../controller/signup.controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class SignupForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    signupController.start();

    const { signup } = store.getState<TSignupState>();
    const { fields: fieldsState } = signup;

    const inputMap = getInputMap(fieldsParams, fieldsState);

    const submitButton = new ButtonFilled({
      label: 'Sign up',
      type: 'submit',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        signupController.input(e);
      },
      onFocusout: () => {
        signupController.verify();
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        signupController.submit();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: TSignupState): void => {
    const { load, fields } = state.signup;
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
