import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './edit-profile-page.template.hbs';
import styles from './styles.module.css';

interface IPageEditProfile extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageEditProfile extends Block<IPageEditProfile> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
