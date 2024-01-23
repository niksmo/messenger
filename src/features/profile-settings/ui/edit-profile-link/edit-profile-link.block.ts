import { Block } from 'shared/components/block/block';
import { SettingsItem } from 'shared/ui/settings-item/settings-item.block';
import { Link } from 'shared/components/router/link.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import templateSpec from './edit-profile-link.template.hbs';

interface EditProfileLinkProps {
  link: Block;
}

export class EditProfileLink extends Block<EditProfileLinkProps> {
  constructor() {
    const settingsItem = new SettingsItem({
      label: 'Edit Profile',
      icon: 'profile',
      style: 'accent',
    });

    const link = new Link({
      href: ROUTE_PATH.EDIT_PROFILE,
      children: settingsItem,
    });
    super({ link });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
