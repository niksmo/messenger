import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './bubble.template.hbs';
import baseStyles from '../base-styles.module.css';
import viewerStyles from './styles.module.css';

interface IOwnBubbleProps {
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

export class BubbleOwn extends Block {
  constructor(props: IOwnBubbleProps & IBlockProps) {
    const { status } = props;
    curStatus = status;
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    const statusStyle =
      curStatus === 'readed' ? styles[STATUS.READED] : styles[STATUS.DELIVERED];

    styles[STYLE_KEY] = statusStyle || '';

    return styles;
  }

  public setProps(newProps: Partial<IOwnBubbleProps>): void {
    const { status } = newProps;
    curStatus = status || curStatus;
    super.setProps(newProps);
  }
}
