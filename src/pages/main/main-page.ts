import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface IMainPageProps {
  sideWidget: Block;
  chatWidget: Block;
}

export class MainPage extends Block {
  constructor(props: IMainPageProps & IBlockProps) {
    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IMainPageProps>): void {
    super.setProps(newProps);
  }
}
