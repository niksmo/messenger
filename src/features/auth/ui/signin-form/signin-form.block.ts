import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import { makeFields } from 'shared/helpers/make';
import { type TSigninState } from '../../model/signin.model';
import { signinController } from '../../controller/signin.controller';
import templateSpec from './signin-form.template.hbs';
import { fieldsParams } from './_lib';

const store = Store.instance();

export class SigninForm extends Block {
  private readonly _fieldsMap;
  private readonly _submitButton;

  constructor() {
    const submitButton = new ButtonFilled({
      label: 'Sign in',
      type: 'submit',
    });

    const fieldsMap = makeFields(fieldsParams);

    super({
      ...fieldsMap,
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

    this._fieldsMap = fieldsMap;
    this._submitButton = submitButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: TSigninState): void => {
    const { load, fields } = state.signin;

    Object.entries(fields).forEach(([field, props]) => {
      const block = this._fieldsMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
    signinController.start();
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
