import { Block } from 'shared/components/block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

export class MessageInput extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<string, string>
  ): boolean {
    if (shouldRender && causeProps.has('value')) {
      shouldRender = false;
    }

    return shouldRender;
  }
}
