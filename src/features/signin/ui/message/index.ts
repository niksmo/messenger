import { Block, type IBlockProps } from 'shared/components/block/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

interface ISigninMessageProps extends IBlockProps {
  visible: boolean;
}

export class SigninMessage extends Block<ISigninMessageProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<ISigninMessageProps>): void {
    super.setProps(newProps);
  }
}
