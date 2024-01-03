import { SettingsItem } from 'shared/ui/settings-item';
import { Link } from 'shared/components/router';
import { PATH } from 'shared/constants';

const settingsItem = new SettingsItem({
  label: 'Change Password',
  icon: 'lock',
  style: 'accent',
});

const changePasswordLink = new Link({
  href: PATH.CHANGE_PASSWORD,
  children: settingsItem,
});

export { changePasswordLink };
