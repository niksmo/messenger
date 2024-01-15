import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './dialog.template.hbs';
import styles from './styles.module.css';
import { ButtonOutlined } from '../button';
import { Overlay } from '../overlay';

interface IDialogContainerProps extends IBlockProps {
  text: string;
  buttonText: [string, string];
  animationStyle?: string;
  declineCb?: () => void;
  approveCb: () => void;
}

class DialogContainer extends Block<IDialogContainerProps> {
  private readonly _declineButtonBlock;

  constructor(props: IDialogContainerProps) {
    const { buttonText, declineCb, approveCb } = props;

    const declineButton = new ButtonOutlined({
      type: 'button',
      label: buttonText[0],
      onClick: declineCb,
    });

    const confirmButton = new ButtonOutlined({
      type: 'button',
      label: buttonText[1],
      onClick: approveCb,
    });

    super({ ...props, declineButton, confirmButton });

    this._declineButtonBlock = declineButton;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IDialogContainerProps>): void {
    const { declineCb, ...rest } = newProps;

    this._declineButtonBlock.setProps({ onClick: declineCb });

    super.setProps(rest);
  }

  public didMount(): void {
    setTimeout(() => {
      this.getContent().classList.toggle(styles['container__opened'] ?? '');
    }, 0);
    this._declineButtonBlock.getContent().focus();
  }

  public willUnmount(): void {
    this.getContent().classList.toggle(styles['container__opened'] ?? '');
  }
}

type TDialogProps = IDialogContainerProps & {
  isVisible: boolean;
};

export class Dialog extends Overlay {
  constructor(props: TDialogProps) {
    const { isVisible, ...containerProps } = props;
    const dialogContainer = new DialogContainer(containerProps);

    super({ isVisible, children: dialogContainer });
    const self = this;

    this.setProps({
      onPointerdown: this._onOverlayClick.bind(this),
    });

    if (!containerProps.declineCb) {
      dialogContainer.setProps({
        declineCb: () => {
          self.setProps({ isVisible: false });
          self.dispatchWillUnmount();
        },
      });
    }
  }

  public didMount(): void {
    window.addEventListener('keydown', this._onEscKeypress);
    super.didMount();
  }

  public willUnmount(): void {
    window.removeEventListener('keydown', this._onEscKeypress);
    super.willUnmount();
  }

  private readonly _onOverlayClick = (e: Event): void => {
    const { target, currentTarget } = e;
    if (target && currentTarget) {
      if (target === currentTarget) {
        this.setProps({ isVisible: false });
        this.dispatchWillUnmount();
      }
    }
  };

  private readonly _onEscKeypress = (e: KeyboardEvent): void => {
    const { code } = e;
    if (code === 'Escape') {
      this.setProps({ isVisible: false });
      this.dispatchWillUnmount();
    }
  };
}
