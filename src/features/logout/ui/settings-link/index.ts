import { Block, IBlockProps } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import templateSpec from './logout-button.template.hbs';

interface ILogoutButtonProps extends IBlockProps {
  onClick?(e: Event): void;
  children?: Block;
}

class LogoutButton extends Block<ILogoutButtonProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}

const settingsItem = new SettingsItem({
  label: 'Log out',
  icon: 'close',
  style: 'adverse',
});

const logoutLink = new LogoutButton({ children: settingsItem });

export { logoutLink };
