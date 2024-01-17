import { Block } from 'shared/components/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

interface WarningTextProps {
  message: string;
  visible: boolean;
}

export class WarningText extends Block<WarningTextProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
