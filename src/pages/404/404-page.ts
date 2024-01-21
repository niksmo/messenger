import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './404.template.hbs';

interface INotFoundPageProps extends IBlockProps {
  warnStub: Block;
  transitionButton: Block;
}

export class NotFoundPage extends Block<INotFoundPageProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
