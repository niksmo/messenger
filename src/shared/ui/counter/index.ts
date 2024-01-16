import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './counter.template.hbs';
import stylesModule from './styles.module.css';

type CounterProps = BlockProps<{
  count: number;
}>;

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
