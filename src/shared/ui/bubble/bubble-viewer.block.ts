import { Block } from 'shared/components/block/block';
import templateSpec from './bubble-viewer.template.hbs';
import baseStyles from './base-styles.module.css';
import viewerStyles from './bubble-viewer.styles.module.css';

interface BubbleOwnProps {
  text: string;
  time: string;
  status: string;
}

const styles = { ...baseStyles, ...viewerStyles };

const STYLE_KEY = 'status_style';

const enum STATUS {
  READED = 'status_style_readed',
  DELIVERED = 'status_style_delivered',
}

let curStatus: string;

export class BubbleOwn extends Block<BubbleOwnProps> {
  constructor(props: BubbleOwnProps) {
    const { status } = props;
    curStatus = status;
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    const statusStyle =
      curStatus === 'readed' ? styles[STATUS.READED] : styles[STATUS.DELIVERED];

    styles[STYLE_KEY] = statusStyle ?? '';

    return styles;
  }

  public setProps(props: Partial<BubbleOwnProps>): void {
    const { status } = props;
    curStatus = status ?? curStatus;
    super.setProps(props);
  }
}
