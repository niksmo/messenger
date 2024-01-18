import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ChangePasswordForm } from 'features/profile-settings/ui/change-password-form/change-password-form.block';
import templateSpec from './change-password-page.template.hbs';
import styles from './styles.module.css';

interface ChangePasswordPageProps {
  form: Block;
  transitionButton: Block;
}

export class ChangePasswordPage extends Block<ChangePasswordPageProps> {
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

    const form = new ChangePasswordForm();

    super({ form, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
