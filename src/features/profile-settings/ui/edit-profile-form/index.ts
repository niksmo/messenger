import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { ButtonFilled } from 'shared/ui/button';
import { getInputMap } from 'shared/helpers';
import { editProfileController } from 'features/profile-settings/controller/edit-profile.controller';
import templateSpec from './form.template.hbs';
import { fieldsParams } from './lib';
import { type TEditProfileState } from 'features/profile-settings/model/edit-profile.model';

const store = Store.instance();

export class EditProfileForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    editProfileController.start();

    const { editProfile } = store.getState<TEditProfileState>();
    const { fields } = editProfile;

    const inputMap = getInputMap(fieldsParams, fields);

    const submitButton = new ButtonFilled({
      type: 'submit',
      label: 'Save',
    });

    super({
      ...inputMap,
      submitButton,
      onInput: (e: Event) => {
        editProfileController.input(e);
      },
      onFocusout: () => {
        editProfileController.verify();
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        editProfileController.submit();
      },
    });

    this._inputMap = inputMap;
    this._submitButton = submitButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  private readonly _onStoreUpdate = (state: TEditProfileState): void => {
    const { load, fields } = state.editProfile;
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
