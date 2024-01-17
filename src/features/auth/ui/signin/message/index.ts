import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store/store';
import { type TSigninState } from 'features/auth/model/signin.model';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

interface SigninMessageProps {
  message: string;
  visible: boolean;
}

const store = Store.instance();

export class SigninMessage extends Block<SigninMessageProps> {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  private readonly _onStoreUpdate = (state: TSigninState): void => {
    const { error: message } = state.signin;
    this.setProps({ message, visible: Boolean(message) });
  };

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
