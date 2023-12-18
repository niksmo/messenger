import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './500.template.hbs';

interface IInternalErrorPageProps extends IBlockProps {
  warnStub: Block;
  transitionButton: Block;
}

export class InternalErrorPage extends Block<IInternalErrorPageProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
