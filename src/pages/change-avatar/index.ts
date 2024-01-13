import { Block } from 'shared/components/block';
import templateSpec from './change-avatar-page.template.hbs';
import styles from './styles.module.css';

export class PageChangeAvatar extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
