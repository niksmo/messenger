import { SettingsItem } from 'shared/ui/settings-item';
import { Link } from 'shared/components/router';
import { PATH } from 'shared/constants';

const settingsItem = new SettingsItem({
  label: 'Edit Profile',
  icon: 'profile',
  style: 'accent',
});

const editProfileLink = new Link({
  href: PATH.EDIT_PROFILE,
  children: settingsItem,
});

export { editProfileLink };
