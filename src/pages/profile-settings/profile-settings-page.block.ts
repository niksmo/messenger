import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ProfileInfo } from 'entites/viewer/ui/profile-info/profile-info.block';
import { EditProfileLink } from 'features/profile-settings/ui/edit-profile-link/edit-profile-link.block';
import { ChangePasswordLink } from 'features/profile-settings/ui/change-password-link/change-password-link.block';
import { LogoutLink } from 'features/auth/ui/logout-link/logout-link.block';
import templateSpec from './profile-settings-page.template.hbs';
import styles from './styles.module.css';

interface SettingsPageProps {
  transitionButton: Block;
  profileInfo: Block;
  navList: Block[];
}

export class SettingsPage extends Block<SettingsPageProps> {
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

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
