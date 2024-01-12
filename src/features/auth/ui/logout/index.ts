import { Block } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import { logoutController } from 'features/auth/controller';
import templateSpec from './logout-link.template.hbs';

export class LogoutLink extends Block {
  constructor() {
    const link = new SettingsItem({
      label: 'Log out',
      icon: 'close',
      style: 'adverse',
    });

    super({
      link,
      onClick: () => {
        void logoutController.logout();
      },
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
