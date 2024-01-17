import { Block } from 'shared/components/block';
import templateSpec from './stub.template.hbs';
import styles from './styles.module.css';

interface WarnStupProps {
  errCode: number;
  message: string;
}

export class WarnStub extends Block<WarnStupProps> {
  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
