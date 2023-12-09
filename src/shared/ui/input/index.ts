import { Block, IBlockProps } from '../block';
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
  input?: (e: Event) => void;
}

export class Input extends Block {
  constructor(props: IInputProps & IBlockProps) {
    super(props, styles);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<IInputProps>) {
    super.setProps(newProps);
  }

  protected _updateInterceptor(
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
