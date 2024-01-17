import { Block } from 'shared/components/block';
import templateSpec from './bubble.template.hbs';
import styles from '../base-styles.module.css';

interface BubbleProps {
  text: string;
  time: string;
}

export class Bubble extends Block<BubbleProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
