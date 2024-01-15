import { Block } from 'shared/components/block';
import templateSpec from './stub.template.hbs';
import styles from './styles.module.css';

export class ChatStub extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
