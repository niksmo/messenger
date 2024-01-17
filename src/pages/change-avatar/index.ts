import { Block } from 'shared/components/block';
import { UploadAvatarForm } from 'features/profile-settings/ui/change-avatar-form';
import templateSpec from './change-avatar-page.template.hbs';
import styles from './styles.module.css';

interface ChangeAvatarPageProps {
  form: Block;
}

export class ChangeAvatarPage extends Block<ChangeAvatarPageProps> {
  constructor() {
    super({ form: new UploadAvatarForm() });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
