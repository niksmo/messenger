import { Button } from './btn-base';
import baseStyles from './styles-base.module.css';
import lightStyles from './styles-light.module.css';

const styles = { ...baseStyles, ...lightStyles };

export class ButtonLight extends Button {
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
