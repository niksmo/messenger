import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './profile-info.template.hbs';
import styles from './styles.module.css';

interface IProfileInfoProps extends IBlockProps {
  avatar: Block;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  login: string;
  phone: string;
  changeAvatar?: Block;
}

export class ProfileInfo extends Block<IProfileInfoProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
