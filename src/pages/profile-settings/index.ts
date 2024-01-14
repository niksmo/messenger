import { Block } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { ProfileInfo } from 'entites/viewer';
import { LogoutLink } from 'features/auth';
import { ChangePasswordLink, EditProfileLink } from 'features/profile-settings';
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
