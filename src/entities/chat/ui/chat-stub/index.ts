import { Block } from 'shared/components/block';
import templateSpec from './stub.template.hbs';
import styles from './styles.module.css';

export class ChatStub extends Block {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
