import { BlockInput, IBlockInputProps } from 'shared/components/block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

export class MessageInput extends BlockInput {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<
      keyof IBlockInputProps,
      IBlockInputProps[keyof IBlockInputProps]
    >
  ) {
    if (shouldRender && causeProps.has('value')) {
      shouldRender = false;
    }

    return shouldRender;
  }
}
