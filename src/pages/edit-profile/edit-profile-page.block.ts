import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { EditProfileForm } from 'features/profile-settings/ui/edit-profile-form/edit-profile-form.block';
import templateSpec from './edit-profile-page.template.hbs';
import styles from './styles.module.css';

interface EditProfilePageProps {
  form: Block;
  transitionButton: Block;
}

export class EditProfilePage extends Block<EditProfilePageProps> {
  constructor() {
    const transitionButton = new Link({
      href: ROUTE_PATH.SETTINGS,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Cancel',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    const form = new EditProfileForm();

    super({ form, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
