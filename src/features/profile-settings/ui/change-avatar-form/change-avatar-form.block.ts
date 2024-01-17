import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { WarningText } from 'shared/ui/warning-text/warning-text.block';
import { ButtonFilled } from 'shared/ui/main-button/button-filled.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { type TChangeAvatarSlice } from 'features/profile-settings/model/change-avatar.model';
import { changeAvatarController } from 'features/profile-settings/controller/change-avatar.controller';
import { UploadButton } from './_upload-button/upload-button.block';
import templateSpec from './change-avatar-form.template.hbs';
import styles from './styles.module.css';

const store = Store.instance();

const STUB_IMAGE_SRC = '/image/avatar-error-loading-stub.webp';

export class UploadAvatarForm extends Block {
  private readonly _message;

  constructor() {
    const { changeAvatar } = store.getState<TChangeAvatarSlice>();
    const { objectURL, error = '' } = { ...changeAvatar };

    const src = error || !objectURL ? STUB_IMAGE_SRC : objectURL;

    const message = new WarningText({
      message: error,
      visible: Boolean(error),
    });

    const submitButton = new ButtonFilled({ type: 'submit', label: 'Save' });

    const pickButton = new UploadButton({
      onChange: (e) => {
        const { target } = e;
        if (target instanceof HTMLInputElement) {
          const { files } = target;
          const imageFile = files?.[0];
          if (imageFile) {
            changeAvatarController.override(imageFile);
          }
        }
      },
    });

    const cancelButton = new ButtonLight({
      type: 'button',
      label: 'Cancel',
      onClick: () => {
        changeAvatarController.reset();
        const router = AppRouter.instance();
        router.go(ROUTE_PATH.SETTINGS, true);
      },
    });

    super({
      src,
      pickButton,
      message,
      submitButton,
      cancelButton,
      onSubmit: (e: Event) => {
        e.preventDefault();
        void changeAvatarController.upload();
      },
    });

    this._message = message;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  private readonly _onStoreUpdate = ({
    changeAvatar,
  }: TChangeAvatarSlice): void => {
    const { objectURL, error } = { ...changeAvatar };

    this._message.setProps({ message: error, visible: Boolean(error) });
    const src = error ? STUB_IMAGE_SRC : objectURL;
    this.setProps({ src });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
