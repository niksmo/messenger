import { Block } from 'shared/components/block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

export class MessageInput extends Block {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<string, string>
  ): boolean {
    if (causeProps.has('value')) {
      shouldRender = false;
    }

    return shouldRender;
  }
}
