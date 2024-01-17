import { Block } from '../block/block';
import templateSpec from './link.template.hbs';
import { AppRouter } from './router';

interface LinkProps {
  href: string;
  ariaHidden?: boolean;
  children: Block;
  replace?: boolean;
}

interface InnerProps {
  ariaHidden?: boolean;
  children: Block;
  onClick: (e: Event) => void;
}

export class Link extends Block<InnerProps> {
  constructor({ href, replace = false, ...rest }: LinkProps) {
    const onClick = (e: Event): void => {
      e.preventDefault();
      const router = AppRouter.instance();
      router.go(href, replace);
    };
    super({ ...rest, onClick });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
