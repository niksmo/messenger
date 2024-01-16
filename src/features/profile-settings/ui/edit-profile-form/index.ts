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
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    editProfileController.start();

    const state = store.getState<IEditProfileState>();
    const { load, ...fieldsState } = state.editProfile;

    const inputMap = getInputMap(fieldsParams, fieldsState);

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

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: IEditProfileState): void => {
    const { load, ...fields } = state.editProfile;
    Object.entries(fields).forEach(([field, props]) => {
      const block = this._inputMap[field];
      if (block) {
        block.setProps({ ...props });
      }
    });

    this._submitButton.setProps({ disabled: load });
  };

  public didMount(): void {
    store.on<IEditProfileState>(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
