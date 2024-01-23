import { Block } from 'shared/components/block/block';
import templateSpec from './bubble-viewer.template.hbs';
import baseStyles from './base-styles.module.css';
import viewerStyles from './bubble-viewer.styles.module.css';

interface BubbleOwnProps {
  content: string;
  time: string;
}

const styles = { ...baseStyles, ...viewerStyles };

export class BubbleOwn extends Block<BubbleOwnProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
