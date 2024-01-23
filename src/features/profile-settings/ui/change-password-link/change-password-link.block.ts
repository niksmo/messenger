import { Block } from 'shared/components/block/block';
import { SettingsItem } from 'shared/ui/settings-item/settings-item.block';
import { Link } from 'shared/components/router/link.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import templateSpec from './change-password-link.template.hbs';

export class ChangePasswordLink extends Block {
  constructor() {
    const settingsItem = new SettingsItem({
      label: 'Change Password',
      icon: 'lock',
      style: 'accent',
    });

    const link = new Link({
      href: ROUTE_PATH.CHANGE_PASSWORD,
      children: settingsItem,
    });

    super({ link });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
