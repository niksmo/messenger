import { Block } from 'shared/components/block';
import { IconButton } from 'shared/ui/button';
import { profileInfo } from 'entites/viewer/controller';
import { ChangeAvatarButton } from 'features/change-avatar';
import templateSpec from './settings.template.hbs';
import styles from './styles.module.css';

interface ISettingsProps {
  navList?: Block[];
}

const VISIBLE_STYLE = styles['sidebar__settings_visible'];

export class Settings extends Block {
  constructor(props: ISettingsProps = {}) {
    const closeButton = new IconButton({
      type: 'button',
      icon: 'backward',
      style: 'primary',
      role: 'menu',
      ariaLabel: 'Back to contacts',
    });

    profileInfo.setProps({
      changeAvatar: new ChangeAvatarButton({ name: 'avatar' }),
    });

    const profile = profileInfo;

    super(Object.assign(props, { closeButton, profile }));

    closeButton.setProps({ onClick: this.closeSettings.bind(this) });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public openSettings() {
    if (VISIBLE_STYLE) {
      const settingsEl = this.getContent();
      if (settingsEl instanceof HTMLDivElement && VISIBLE_STYLE) {
        settingsEl.classList.add(VISIBLE_STYLE);
      }
    }
  }
  public closeSettings() {
    if (VISIBLE_STYLE) {
      const settingsEl = this.getContent();
      if (settingsEl instanceof HTMLDivElement && VISIBLE_STYLE) {
        settingsEl.classList.remove(VISIBLE_STYLE);
      }
    }
  }
}
