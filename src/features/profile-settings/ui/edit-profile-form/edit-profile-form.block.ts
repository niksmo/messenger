import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import { editProfileController } from 'features/profile-settings/controller/edit-profile.controller';
import { type TEditProfileState } from 'features/profile-settings/model/edit-profile.model';
import templateSpec from './edit-profile-form.template.hbs';
import { fieldsParams } from './_lib';
import { makeFields } from 'shared/helpers/make';

const store = Store.instance();

export class EditProfileForm extends Block {
  private readonly _inputMap;
  private readonly _submitButton;

  constructor() {
    const inputMap = makeFields(fieldsParams);

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
    editProfileController.start(this.getContent());
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
