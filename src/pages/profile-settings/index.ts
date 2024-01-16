import { Block } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { ProfileInfo } from 'entites/viewer/ui/profile-info';
import { EditProfileLink } from 'features/profile-settings/ui/edit-profile-link';
import { ChangePasswordLink } from 'features/profile-settings/ui/change-password-link';
import { LogoutLink } from 'features/auth/ui/logout/logout-link';
import templateSpec from './profile-settings-page.template.hbs';
import styles from './styles.module.css';

export class PageSettings extends Block {
  constructor() {
    const transitionButton = new Link({
      href: ROUTE_PATH.MAIN,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Back to chats',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    const profileInfo = new ProfileInfo();

    const navList = [
      new EditProfileLink(),
      new ChangePasswordLink(),
      new LogoutLink(),
    ];

    super({ transitionButton, profileInfo, navList });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
