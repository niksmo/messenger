import { Block, type IBlockProps } from 'shared/components/block';
import { Store } from 'shared/components/store';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';
import { signinController } from 'features/auth/controller';

interface ISigninMessageProps extends IBlockProps {
  message: string;
  visible: boolean;
}

interface ISigninState {
  signin: {
    error: string;
  };
}

export class SigninMessage extends Block<ISigninMessageProps> {
  constructor() {
    super();

    const store = Store.instance();

    store.on<ISigninState>((state) => {
      const { error: message } = state.signin;
      this.setProps({ message: message, visible: Boolean(message) });
    });

    signinController.initBlock();
  }

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
