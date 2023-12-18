import { Block } from 'shared/components/block';
import templateSpec from './overlay.template.hbs';
import styles from './styles.module.css';

const STYLE_TAG = 'overlay_visible';

export class Overlay extends Block {
  constructor(props = {}) {
    super(props);
  }
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public toggle() {
    this.getContent().classList.toggle(styles[STYLE_TAG] || '');
  }

  public show() {
    this.getContent().classList.add(styles[STYLE_TAG] || '');
  }

  public hide() {
    this.getContent().classList.remove(styles[STYLE_TAG] || '');
  }
}
