import { Block, IBlockProps } from 'shared/components/block/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

interface ISigninMessageProps {
  visible: boolean;
}

export class SigninMessage extends Block {
  constructor(props: ISigninMessageProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<ISigninMessageProps>): void {
    super.setProps(newProps);
  }
}
