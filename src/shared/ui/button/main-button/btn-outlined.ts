import { Button } from './btn-base';
import baseStyles from './styles-base.module.css';
import outlinedStyles from './styles-outlined.module.css';

const styles = { ...baseStyles, ...outlinedStyles };

export class ButtonOutlined extends Button {
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
