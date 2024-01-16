import { Block, type BlockProps } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import { Link } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import templateSpec from './edit-profile-link.template.hbs';

type EditProfileLinkProps = BlockProps<{
  link: Block;
}>;

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
