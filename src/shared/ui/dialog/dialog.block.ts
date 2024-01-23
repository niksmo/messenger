import { Block } from 'shared/components/block/block';
import { withInterrupt } from 'shared/helpers/with';
import { ButtonOutlined } from '../main-button/button-outlined.block';
import { Overlay } from '../overlay/overlay.block';
import templateSpec from './dialog.template.hbs';
import styles from './styles.module.css';

interface DialogContainerProps {
  text: string;
  buttonText: [string, string];
  declineCb?: () => void;
  approveCb: () => void;
}

interface InnerProps {
  text: string;
  declineButton: Block;
  confirmButton: Block;
}

class DialogContainer extends Block<InnerProps> {
  private readonly _declineButtonBlock;

  constructor(props: DialogContainerProps) {
    const { text, buttonText, declineCb, approveCb } = props;

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

    super({ text, declineButton, confirmButton });

    this._declineButtonBlock = declineButton;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public setProps(props: Partial<DialogContainerProps>): void {
    const { declineCb, ...rest } = props;

    this._declineButtonBlock.setProps({ onClick: declineCb });

    super.setProps(rest);
  }

  private _toggleAnimation(): void {
    const htmlEl = this.getContent();
    htmlEl.classList.toggle(styles['container__opened'] ?? '');
  }

  public didMount(): void {
    const toggleAnimationWithInterrupt = withInterrupt(
      this._toggleAnimation.bind(this)
    );

    toggleAnimationWithInterrupt();

    this._declineButtonBlock.getContent().focus();
  }

  public willUnmount(): void {
    this._toggleAnimation();
  }
}

type DialogProps = DialogContainerProps & {
  isVisible: boolean;
};

export class Dialog extends Overlay {
  constructor(props: DialogProps) {
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
