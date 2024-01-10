import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

type TInputTypes = 'text' | 'email' | 'password' | 'tel' | 'number';

interface IInputProps extends IBlockProps {
  id: string | number;
  type: TInputTypes;
  name: string;
  value?: string;
  placeholder?: string;
  error?: boolean;
  hint?: string;
}

export class Input extends Block<IInputProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected _getListenersSelector(): string {
    return 'input';
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<keyof IInputProps, IInputProps[keyof IInputProps]>,
    _oldProps: IBlockProps,
    block: Block
  ): boolean {
    if (!block.getContent()) {
      return shouldRender;
    }

    const htmlInput = block.getContent().querySelector('input');
    const errorStyle = this._getStylesModule()['form-input__inner_error'];

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
      shouldRender = true;
    }

    return shouldRender;
  }
}
