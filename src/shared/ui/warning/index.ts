import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

type WarningTextProps = BlockProps<{
  message: string;
  visible: boolean;
}>;

export class WarningText extends Block<WarningTextProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
