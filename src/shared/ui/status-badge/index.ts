import { Block } from 'shared/components/block';
import templateSpec from './status-badge.template.hbs';
import stylesModule from './styles.module.css';

export type TStatus = 'readed' | 'delivered' | 'none';

export interface IStatusBadge {
  status: TStatus;
}

let curStatus: TStatus;
const styles = { ...stylesModule };

export class StatusBadge extends Block {
  constructor(props: IStatusBadge) {
    const { status } = props;
    curStatus = status;
    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    const curStatusStyle = styles[curStatus];
    if (curStatusStyle) {
      styles.status = curStatusStyle;
    }
    return styles;
  }
}
