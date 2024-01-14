import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getFieldsValues, getInputMap, getInputValue } from 'shared/helpers';
import { type IEditProfileState } from '../../model';
import { editProfileController } from '../../controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';

const store = Store.instance();

export class EditProfileForm extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    editProfileController.start();

    const state = store.getState<IEditProfileState>();
    const { load, ...fields } = state.editProfile;

    const inputMap = getInputMap(fieldsParams, fields);

    const submitButton = new ButtonFilled({
      type: 'submit',
      label: 'Save',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        editProfileController.input(getInputValue(e));
      },
      onFocusout: (e: Event) => {
        editProfileController.verify(getFieldsValues(e));
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        void editProfileController.submit(getFieldsValues(e));
      },
    });

    this._onStoreUpdate = (state: IEditProfileState) => {
      const { load, ...fields } = state.editProfile;
      Object.entries(fields).forEach(([field, props]) => {
        const block = inputMap[field];
        if (block) {
          block.setProps({ ...props });
        }
      });

      submitButton.setProps({ disabled: load });
    };

    store.on<IEditProfileState>(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
