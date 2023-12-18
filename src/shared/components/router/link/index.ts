import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './link.template.hbs';
import { routeTo } from '../lib';

interface ILinkProps {
  href: string;
  ariaHidden?: boolean;
  children?: Block;
}

export class Link extends Block {
  constructor(props: ILinkProps & IBlockProps) {
    props.onClick = (e: Event) => {
      e.preventDefault();
      routeTo(props.href);
    };
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<ILinkProps>) {
    super.setProps(newProps);
  }
}
