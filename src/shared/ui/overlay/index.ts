import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './overlay.template.hbs';
import styles from './styles.module.css';
import { withInterrupt } from 'shared/helpers/with';

interface IOverlayProps extends IBlockProps {
  isVisible: boolean;
  children: Block;
}

const appRoot = document.getElementById('app');

export class Overlay extends Block<IOverlayProps> {
  private _isVisible: boolean = false;

  constructor(props: IOverlayProps) {
    super(props);
    const { isVisible } = props;
    this._isVisible = isVisible;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IOverlayProps>): void {
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
