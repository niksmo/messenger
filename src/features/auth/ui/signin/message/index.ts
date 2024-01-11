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

const store = Store.instance();

export class SigninMessage extends Block<ISigninMessageProps> {
  private readonly _onStoreUpdate;

  constructor() {
    super();

    this._onStoreUpdate = (state: ISigninState) => {
      const { error: message } = state.signin;
      this.setProps({ message: message, visible: Boolean(message) });
    };

    store.on<ISigninState>(this._onStoreUpdate);

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

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
