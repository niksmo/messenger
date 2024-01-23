import { Block } from 'shared/components/block/block';
import templateSpec from './bubble-buddy.template.hbs';
import styles from './base-styles.module.css';

interface BubbleProps {
  content: string;
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
