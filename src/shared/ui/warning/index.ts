import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

interface IWarningTextProps extends IBlockProps {
  message: string;
  visible: boolean;
}

export class WarningText extends Block<IWarningTextProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
