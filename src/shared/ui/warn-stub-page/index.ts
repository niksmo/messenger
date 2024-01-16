import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './stub.template.hbs';
import styles from './styles.module.css';

type WarnStupProps = BlockProps<{
  errCode: number;
  message: string;
}>;

export class WarnStub extends Block<WarnStupProps> {
  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
