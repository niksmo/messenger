import { Block } from 'shared/components/block';
import templateSpec from './invisible-input.template.hbs';
import styles from './styles.module.css';

export class InvisibleFileInput extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
