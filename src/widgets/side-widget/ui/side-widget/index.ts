import { Block } from 'shared/components/block';
import templateSpec from './side-widget.template.hbs';
import styles from './styles.module.css';

interface ISideWidget {
  chatList: Block;
  settings?: Block;
}

export class SideWidget extends Block {
  constructor(props: ISideWidget) {
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
