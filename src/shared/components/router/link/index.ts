import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './link.template.hbs';
import { routeTo } from '../lib';

interface ILinkProps extends IBlockProps {
  href: string;
  ariaHidden?: boolean;
  children?: Block;
}

export class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    props.onClick = (e: Event) => {
      e.preventDefault();
      routeTo(props.href);
    };
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
