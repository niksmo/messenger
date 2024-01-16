import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import { changePasswordController } from 'features/profile-settings/controller/change-password.controller';
import type { IChangePasswordState } from 'features/profile-settings/model/change-password.model';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class ChangePasswordForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    changePasswordController.start();

    const { changePassword } = store.getState<IChangePasswordState>();
    const { load, ...fields } = changePassword;

    const inputMap = getInputMap(fieldsParams, fields);

    const submitButton = new ButtonFilled({
      type: 'submit',
      label: 'Change',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        changePasswordController.input(getInputValue(e));
      },
      onFocusout: (e: Event) => {
        changePasswordController.verify(getFieldsValues(e));
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        void changePasswordController.submit(getFieldsValues(e));
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: IChangePasswordState): void => {
    const { load, ...fields } = state.changePassword;
    Object.entries(fields).forEach(([field, props]) => {
      const block = this._inputMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on<IChangePasswordState>(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
