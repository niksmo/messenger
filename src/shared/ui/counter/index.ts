import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './counter.template.hbs';
import stylesModule from './styles.module.css';

interface ICounterProps extends IBlockProps {
  count: number;
}

const styles = { ...stylesModule } as unknown as {
  hidden: string;
  'is-hidden': string;
};

export class Counter extends Block<ICounterProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    if (this.props.count) {
      styles['is-hidden'] = styles.hidden;
    } else {
      styles['is-hidden'] = '';
    }

    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public didUpdate(): void {}
}
