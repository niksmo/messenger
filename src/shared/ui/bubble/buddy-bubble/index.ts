import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './bubble.template.hbs';
import styles from '../base-styles.module.css';

interface IBubbleProps extends IBlockProps {
  text: string;
  time: string;
}

export class Bubble extends Block<IBubbleProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
