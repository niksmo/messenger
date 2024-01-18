import { Block } from 'shared/components/block/block';
import templateSpec from './overlay.template.hbs';
import styles from './styles.module.css';

const STYLE_TAG = 'overlay_visible';

export class Overlay extends Block {
  constructor(props = {}) {
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public toggle(): void {
    this.getContent().classList.toggle(styles[STYLE_TAG] ?? '');
  }

  public show(): void {
    this.getContent().classList.add(styles[STYLE_TAG] ?? '');
  }

  public hide(): void {
    this.getContent().classList.remove(styles[STYLE_TAG] ?? '');
  }
}
