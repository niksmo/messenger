import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './change-password-page.template.hbs';
import styles from './styles.module.css';

interface IPageSignupProps extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageSignup extends Block<IPageSignupProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
