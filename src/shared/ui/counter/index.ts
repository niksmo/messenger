import { Block } from 'shared/components/block';
import templateSpec from './counter.template.hbs';
import stylesModule from './styles.module.css';

interface ICounterProps {
  count?: number;
}

let curCount: number | undefined;

const styles = { ...stylesModule };

export class Counter extends Block {
  constructor(props: ICounterProps) {
    const { count } = props;
    curCount = count;

    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    if (curCount === undefined) {
      styles['is-hidden'] = styles.hidden as string;
    }
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public didUpdate(): void {}

  public setProps(newProps: Partial<ICounterProps>): void {
    const { count } = newProps;
    curCount = count;
    super.setProps(newProps);
  }
}
