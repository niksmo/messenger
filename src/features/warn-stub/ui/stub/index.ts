import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './stub.template.hbs';
import styles from './styles.module.css';

interface IWarnStupProps extends IBlockProps {
  errCode: number;
  message: string;
}

export class WarnStub extends Block<IWarnStupProps> {
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
