import { Block, type IBlockProps } from 'shared/components/block';
import { Store } from 'shared/components/store';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

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
    const store = Store.instance();

    store.on<ISigninState>((state) => {
      const {
        signin: { error = '' },
      } = state;

      this.setProps({ message: error, visible: Boolean(error) });
    });

    super();
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
