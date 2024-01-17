import { Block } from 'shared/components/block/block';
import templateSpec from './overlay.template.hbs';
import styles from './styles.module.css';
import { withInterrupt } from 'shared/helpers/with';

interface OverlayProps {
  isVisible: boolean;
  children: Block;
  onPointerdown?: (e: Event) => void;
}

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

  public setProps(props: Partial<OverlayProps>): void {
    const { isVisible } = props;

    if (isVisible !== undefined) {
      this._isVisible = isVisible;
    }

    super.setProps(props);
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
