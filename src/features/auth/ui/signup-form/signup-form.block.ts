import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import { type TSignupState } from '../../model/signup.model';
import { signupController } from '../../controller/signup.controller';
import templateSpec from './signup-form.template.hbs';
import { fieldsParams } from './_lib';
import { makeFields } from 'shared/helpers/make';

const store = Store.instance();

export class SignupForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    const inputMap = makeFields(fieldsParams);

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
    signupController.start();
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
