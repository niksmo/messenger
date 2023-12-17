import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './profile-info.template.hbs';
import styles from './styles.module.css';

interface IProfileInfoProps {
  avatar: Block;
  firstName: string;
  lastName: string;
  userName: string;
  changeAvatar?: Block;
}

export class ProfileInfo extends Block {
  constructor(props: IProfileInfoProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
