import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/button';
import { getInputMap } from 'shared/helpers';
import { changePasswordController } from 'features/profile-settings/controller/change-password.controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';
import { type TChangePasswordState } from 'features/profile-settings/model/change-password.model';

const store = Store.instance();

export class ChangePasswordForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    changePasswordController.start();

    const { changePassword } = store.getState<TChangePasswordState>();
    const { fields } = changePassword;

    const inputMap = getInputMap(fieldsParams, fields);

    const submitButton = new ButtonFilled({
      type: 'submit',
      label: 'Change',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        changePasswordController.input(e);
      },
      onFocusout: () => {
        changePasswordController.verify();
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        changePasswordController.submit();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: TChangePasswordState): void => {
    const { load, fields } = state.changePassword;
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
