import { Block } from 'shared/components/block/block';
import { changeAvatarController } from 'features/profile-settings/controller/change-avatar.controller';
import templateSpec from './invisible-input.template.hbs';
import styles from './styles.module.css';

export class InvisibleFileInput extends Block {
  constructor() {
    super({
      name: 'changeAvatar',
      onChange: (e: Event): void => {
        const { target } = e;
        if (target instanceof HTMLInputElement) {
          const { files } = target;
          if (files?.[0]) {
            const avatar = files[0];
            changeAvatarController.preview(avatar);
          }
        }
      },
    });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
