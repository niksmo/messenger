import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import { type IChangePasswordState } from '../../model';
import { changePasswordController } from '../../controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class ChangePasswordForm extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    changePasswordController.start();

    const state = store.getState<IChangePasswordState>();
    const { load, ...fields } = state.changePassword;

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

    this._onStoreUpdate = (state: IChangePasswordState) => {
      const { load, ...fields } = state.changePassword;
      Object.entries(fields).forEach(([field, props]) => {
        const block = inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      });

      submitButton.setProps({ disabled: load });
    };

    store.on<IChangePasswordState>(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
