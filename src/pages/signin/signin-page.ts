import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './signin-page.template.hbs';
import styles from './styles.module.css';

interface IPageSigninProps extends IBlockProps {
  message: Block;
  form: Block;
  transitionButton: Block;
}

export class PageSignin extends Block<IPageSigninProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
