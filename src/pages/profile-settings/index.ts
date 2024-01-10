import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUT_PATH } from 'shared/constants';
import { profileInfo } from 'entites/viewer';
import { InvisibleFileInput } from 'features/change-avatar';
import { EditProfileLink } from 'features/edit-profile';
import { ChangePasswordLink } from 'features/change-password';
import { LogoutLink } from 'features/logout';
import templateSpec from './profile-settings-page.template.hbs';
import styles from './styles.module.css';

interface IProps extends IBlockProps {
  profileInfo: Block;
  transitionButton: Block;
  navList: Block[];
}

export class PageSettings extends Block<IProps> {
  constructor() {
    const transitionButton = new Link({
      href: ROUT_PATH.MAIN,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Back to chats',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    profileInfo.setProps({ changeAvatar: new InvisibleFileInput() });

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

  public setVisible(): void {
    this.getContent().style.display = 'flex';
  }
}
