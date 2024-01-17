import { Button } from './btn-base';
import baseStyles from './styles-base.module.css';
import filledStyles from './styles-filled.module.css';

const styles = { ...baseStyles, ...filledStyles };

export class ButtonFilled extends Button {
  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
