import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './500.template.hbs';

interface IInternalErrorPageProps {
  warnStub: Block;
  transitionButton: Block;
}

export class InternalErrorPage extends Block {
  constructor(props: IInternalErrorPageProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public setProps(newProps: Partial<IInternalErrorPageProps>): void {
    super.setProps(newProps);
  }
}
