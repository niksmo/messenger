import { Block, type BlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { ChangePasswordForm } from 'features/profile-settings/ui/change-password-form';
import templateSpec from './change-password-page.template.hbs';
import styles from './styles.module.css';

type ChangePasswordPageProps = BlockProps<{
  form: Block;
  transitionButton: Block;
}>;

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
