import { Block, type IBlockProps } from 'shared/components/block';
import { SettingsItem } from 'shared/ui/settings-item';
import templateSpec from './logout-link.template.hbs';

interface IProps extends IBlockProps {
  link: Block;
}

export class LogoutLink extends Block<IProps> {
  constructor() {
    const link = new SettingsItem({
      label: 'Log out',
      icon: 'close',
      style: 'adverse',
    });

    const onClick = (): void => {
      alert('logout');
    };

    super({ link, onClick });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
