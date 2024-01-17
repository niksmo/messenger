import { Block } from 'shared/components/block/block';
import templateSpec from './status-badge.template.hbs';
import stylesModule from './styles.module.css';

type TStatus = 'readed' | 'delivered' | 'none';

interface StatusBadgeProps {
  status: TStatus;
}

const styles = { ...stylesModule };
let curStatus: TStatus;

export class StatusBadge extends Block<StatusBadgeProps> {
  constructor(props: StatusBadgeProps) {
    const { status } = props;
    curStatus = status;
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    const curStatusStyle = styles[curStatus];
    if (curStatusStyle) {
      styles.status = curStatusStyle;
    }
    return styles;
  }
}
