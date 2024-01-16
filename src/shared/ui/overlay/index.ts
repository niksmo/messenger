import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './overlay.template.hbs';
import styles from './styles.module.css';
import { withInterrupt } from 'shared/helpers/with';

type OverlayProps = BlockProps<{
  isVisible: boolean;
  children: Block;
}>;

const appRoot = document.getElementById('app');

export class Overlay extends Block<OverlayProps> {
  private _isVisible: boolean = false;

  constructor(props: OverlayProps) {
    super(props);
    const { isVisible } = props;
    this._isVisible = isVisible;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<OverlayProps>): void {
    const { isVisible } = newProps;

    if (isVisible !== undefined) {
      this._isVisible = isVisible;
    }

    super.setProps(newProps);
  }

  public didMount(): void {
    if (this._isVisible) {
      appRoot?.append(this.getContent());
    }
  }

  public willUnmount(): void {
    const htmlEl = this.getContent();
    const removeWithInterrupt = withInterrupt(htmlEl.remove.bind(htmlEl));
    removeWithInterrupt();
  }
}
