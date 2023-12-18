import { Block } from 'shared/components/block';
import templateSpec from './plug.template.hbs';
import styles from './styles.module.css';

export class ChatPlug extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
