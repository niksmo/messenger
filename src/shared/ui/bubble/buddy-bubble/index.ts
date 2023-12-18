import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './bubble.template.hbs';
import styles from '../base-styles.module.css';

interface IBubbleProps {
  text: string;
  time: string;
}

export class Bubble extends Block {
  constructor(props: IBubbleProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IBubbleProps>): void {
    super.setProps(newProps);
  }
}
