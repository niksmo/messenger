import { Block, type IBlockProps } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import { Link } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import templateSpec from './edit-profile-link.template.hbs';

interface IProps extends IBlockProps {
  link: Block;
}

export class EditProfileLink extends Block<IProps> {
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

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
