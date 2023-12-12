import { BlockInput } from '../../../components/block';
import { IBlockProps } from '../../../components/block/block';
import templateSpec from './button.template.hbs';

interface IButtonProps {
  label: string;
  type: 'button' | 'submit';
  name: string;
  load?: boolean;
  disabled?: boolean;
  onClick?: (e: Event) => void;
}

export class Button extends BlockInput {
  constructor(props: IButtonProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<IButtonProps>) {
    super.setProps(newProps);
  }
}
