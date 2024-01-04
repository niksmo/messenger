import { Block, type IBlockProps } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import { Link } from 'shared/components/router';
import { PATH } from 'shared/constants';
import templateSpec from './change-password-link.template.hbs';

interface IProps extends IBlockProps {
  link: Block;
}

export class ChangePasswordLink extends Block<IProps> {
  constructor() {
    const settingsItem = new SettingsItem({
      label: 'Change Password',
      icon: 'lock',
      style: 'accent',
    });

    const link = new Link({
      href: PATH.CHANGE_PASSWORD,
      children: settingsItem,
    });

    super({ link });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
