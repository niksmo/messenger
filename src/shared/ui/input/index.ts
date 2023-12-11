import { BlockInput } from '../../components/block';
import { Block, IBlockProps } from '../../components/block/block';
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

  public renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<keyof IInputProps, IInputProps[keyof IInputProps]>,
    block: Block
  ): boolean {
    if (shouldRender && causeProps.has('value')) {
      shouldRender = false;
      const input = block
        .getContent()
        .querySelector('input') as HTMLInputElement;
      const errorStyle = input.classList.item(1);
      if (errorStyle) {
        input.classList.remove(errorStyle);
      }
    }

    return shouldRender;
  }
}
