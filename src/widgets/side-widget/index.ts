import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './side-widget.template.hbs';
import styles from './styles.module.css';

interface ISideWidget extends IBlockProps {
  chatList: Block[];
}

export class SideWidget extends Block<ISideWidget> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
