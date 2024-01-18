import { Block } from 'shared/components/block/block';
import templateSpec from './counter.template.hbs';
import stylesModule from './styles.module.css';

interface CounterProps {
  count: number;
}

const styles = { ...stylesModule } as unknown as {
  hidden: string;
  'is-hidden': string;
};

export class Counter extends Block<CounterProps> {
  protected getTemplateHook(): TemplateSpecification {
    if (this.props.count) {
      styles['is-hidden'] = styles.hidden;
    } else {
      styles['is-hidden'] = '';
    }

    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
