import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './side-widget.template.hbs';

interface ISideWidget extends IBlockProps {
  chatList: Block;
  settings?: Block;
}

export class SideWidget extends Block<ISideWidget> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
