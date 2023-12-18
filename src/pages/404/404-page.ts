import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './404.template.hbs';

interface INotFoundPageProps {
  warnStub: Block;
  transitionButton: Block;
}

export class NotFoundPage extends Block {
  constructor(props: INotFoundPageProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public setProps(newProps: Partial<INotFoundPageProps>): void {
    super.setProps(newProps);
  }
}
