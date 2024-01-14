import { Block } from 'shared/components/block';
import { UploadAvatarForm } from 'features/profile-settings';
import templateSpec from './change-avatar-page.template.hbs';
import styles from './styles.module.css';

export class PageChangeAvatar extends Block {
  constructor() {
    super({ form: new UploadAvatarForm() });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
