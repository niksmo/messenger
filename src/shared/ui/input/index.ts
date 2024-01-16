import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

type TInputTypes = 'text' | 'email' | 'password' | 'tel' | 'number';

type InputProps = BlockProps<{
  id: string | number;
  type: TInputTypes;
  name: string;
  value?: string;
  placeholder?: string;
  error?: boolean;
  hint?: string;
}>;

export class Input extends Block<InputProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected getListenersSelectorHook(): string {
    return 'input';
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<string, unknown>,
    block: Block
  ): boolean {
    if (!block.getContent()) {
      return shouldRender;
    }

    const htmlInput = block.getContent().querySelector('input');
    const htmlHint = block.getContent().querySelector('p');
    const errorStyle = this.getStylesModuleHook()['form-input__inner_error'];

    if (causeProps.has('value')) {
      shouldRender = false;
    }

    if (causeProps.has('error')) {
      shouldRender = false;

      if (htmlInput && errorStyle) {
        if (causeProps.get('error')) {
          htmlInput.classList.add(errorStyle);
        } else {
          htmlInput.classList.remove(errorStyle);
        }
      }
    }

    if (causeProps.has('hint')) {
      shouldRender = false;
      if (htmlHint) {
        const hintText = causeProps.get('hint');
        if (typeof hintText === 'string') {
          htmlHint.textContent = hintText;
        }
      }
    }

    return shouldRender;
  }
}
