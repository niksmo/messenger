import { Block, type BlockProps } from 'shared/components/block';
import { AppRouter } from '..';
import templateSpec from './link.template.hbs';

type LinkProps = BlockProps<{
  href: string;
  ariaHidden?: boolean;
  children?: Block;
  replace?: boolean;
}>;

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const { href, replace = false } = props;

    props.onClick = (e: Event) => {
      e.preventDefault();
      const router = AppRouter.instance();
      router.go(href, replace);
    };
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
