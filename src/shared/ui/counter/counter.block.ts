import { Block } from 'shared/components/block/block';
import templateSpec from './counter.template.hbs';
import styles from './styles.module.css';

interface CounterProps {
  count: number;
}

interface InnerProps {
  count: number;
  isHidden: boolean;
}

export class Counter extends Block<InnerProps> {
  constructor({ count }: CounterProps) {
    super({ count, isHidden: count === 0 });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
