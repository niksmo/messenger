import templateSpec from './upload-avatar.template.hbs';
import styles from './styles.module.css';
import { Block } from 'shared/components/block';

export class InvisibleFileInput extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
