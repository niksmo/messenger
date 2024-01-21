import { Link } from 'shared/components/router';
import { SettingsItem } from 'shared/ui/settings-item';

const settingsItem = new SettingsItem({
  label: 'Change Password',
  icon: 'lock',
  style: 'accent',
});

const changePasswordLink = new Link({
  href: '/change-password/',
  children: settingsItem,
});

export { changePasswordLink };
