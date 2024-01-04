import { Block, type IBlockProps } from 'shared/components/block';
import { chatWidget } from 'widgets/chat-widget';
import { sideWidget } from 'widgets/side-widget';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface IPageMainProps extends IBlockProps {
  sideWidget: Block;
  chatWidget: Block;
}

export class PageMain extends Block<IPageMainProps> {
  constructor() {
    super({ sideWidget, chatWidget });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setVisible(): void {
    this.getContent().style.display = 'flex';
  }
}
