import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './button.template.hbs';

type ButtonProps = BlockProps<{
  label: string;
  type: 'button' | 'submit';
  name?: string;
  load?: boolean;
  disabled?: boolean;
  children?: Block;
  onClick?: (e: Event) => void;
}>;

export class Button extends Block<ButtonProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
