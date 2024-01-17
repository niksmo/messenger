import { Block } from 'shared/components/block';
import templateSpec from './button.template.hbs';

interface ButtonProps {
  label: string;
  type: 'button' | 'submit';
  name?: string;
  load?: boolean;
  disabled?: boolean;
  children?: Block;
  onClick?: (e: Event) => void;
}

export class Button extends Block<ButtonProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
