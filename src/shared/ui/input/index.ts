import { BlockInput } from 'shared/components/block';
import { Block, IBlockProps } from 'shared/components/block/block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

type TInputTypes = 'text' | 'email' | 'password' | 'tel' | 'number';

interface IInputProps {
  id: string;
  type: TInputTypes;
  name: string;
  placeholder: string;
  value: string;
  error?: boolean;
  support?: string;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
}

export class Input extends BlockInput {
  constructor(props: IInputProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  protected _getStylesModule() {
    return styles;
  }

  public setProps(newProps: Partial<IInputProps>) {
    super.setProps(newProps);
  }

  protected _getListenersSelector(): string {
    return 'input';
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<keyof IInputProps, IInputProps[keyof IInputProps]>,
    oldProps: IBlockProps,
    block: Block
  ) {
    const htmlInput = block.getContent().querySelector('input');
    const errorStyle = this._getStylesModule()['form-input__inner_error'];

    if (shouldRender && causeProps.has('value')) {
      shouldRender = false;
      if (htmlInput && errorStyle) {
        htmlInput.classList.remove(errorStyle);
      }
    } else if (!shouldRender && oldProps.error) {
      if (htmlInput && errorStyle) {
        htmlInput.classList.add(errorStyle);
      }
    }

    return shouldRender;
  }
}
