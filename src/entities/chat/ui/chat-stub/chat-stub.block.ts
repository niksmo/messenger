import { Block } from 'shared/components/block/block';
import templateSpec from './chat-stub.template.hbs';
import styles from './styles.module.css';

export class ChatStub extends Block {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
