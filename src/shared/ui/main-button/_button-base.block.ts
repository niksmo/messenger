import { Block } from 'shared/components/block/block';
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

  protected renderInterceptorHook(
    shouldRender: boolean,
    causeProps: Map<keyof ButtonProps, unknown>
  ): boolean {
    if (causeProps.has('disabled')) {
      shouldRender = false;
    }

    return shouldRender;
  }
}
