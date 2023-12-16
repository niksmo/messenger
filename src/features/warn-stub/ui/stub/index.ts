import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './stub.template.hbs';
import styles from './styles.module.css';

interface IWarnStupProps {
  errCode: number;
  message: string;
}

export class WarnStub extends Block {
  constructor(props: IWarnStupProps & IBlockProps) {
    super(props);
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public setProps(newProps: Partial<IWarnStupProps>): void {
    super.setProps(newProps);
  }
}
