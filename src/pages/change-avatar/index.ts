import { Block } from 'shared/components/block';
import templateSpec from './change-avatar-page.template.hbs';
import styles from './styles.module.css';
import { UploadAvatarForm } from 'features/change-avatar/ui/form';

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
