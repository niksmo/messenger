import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './main-page.template.hbs';
import styles from './styles.module.css';

interface IMainPageProps extends IBlockProps {
  sideWidget: Block;
  chatWidget: Block;
}

export class MainPage extends Block<IMainPageProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
