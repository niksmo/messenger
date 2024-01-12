import { Block } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import { Link } from 'shared/components/router';
import { ROUT_PATH } from 'shared/constants';
import templateSpec from './change-password-link.template.hbs';

export class ChangePasswordLink extends Block {
  constructor() {
    const settingsItem = new SettingsItem({
      label: 'Change Password',
      icon: 'lock',
      style: 'accent',
    });

    const link = new Link({
      href: ROUT_PATH.CHANGE_PASSWORD,
      children: settingsItem,
    });

    super({ link });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
