import { Block, IBlockProps } from '../block';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

type TInputTypes = 'text' | 'email' | 'password' | 'tel' | 'number';

interface InputProps extends IBlockProps {
  id: string;
  type: TInputTypes;
  name: string;
  placeholder: string;
  error?: boolean;
  support?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props, styles);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<InputProps>) {
    super.setProps(newProps);
  }
}
