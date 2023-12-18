import { Link } from 'shared/components/router';
import { SettingsItem } from 'shared/ui/settings-item';

const settingsItem = new SettingsItem({
  label: 'Edit Profile',
  icon: 'profile',
  style: 'accent',
});

const editProfileLink = new Link({
  href: '/edit-profile/',
  children: settingsItem,
});

export { editProfileLink };
