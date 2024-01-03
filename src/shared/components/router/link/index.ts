import { Block, type IBlockProps } from 'shared/components/block';
import { AppRouter } from '..';
import templateSpec from './link.template.hbs';

interface ILinkProps extends IBlockProps {
  href: string;
  ariaHidden?: boolean;
  children?: Block;
  replace?: boolean;
}

export class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    const { href, replace = false } = props;

    props.onClick = (e: Event) => {
      e.preventDefault();
      const router = AppRouter.instance();
      router.go(href, replace);
    };
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
