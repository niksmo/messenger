import { BlockInput } from 'shared/components/block';
import { type Block, type IBlockProps } from 'shared/components/block/block';
import templateSpec from './button.template.hbs';

interface IButtonProps extends IBlockProps {
  label: string;
  type: 'button' | 'submit';
  name: string;
  load?: boolean;
  disabled?: boolean;
  children?: Block;
  onClick?: (e: Event) => void;
}

export class Button extends BlockInput<IButtonProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
