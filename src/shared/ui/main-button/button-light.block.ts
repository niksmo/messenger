import { Button } from './_button-base.block';
import baseStyles from './styles-base.module.css';
import lightStyles from './styles-light.module.css';

const styles = { ...baseStyles, ...lightStyles };

export class ButtonLight extends Button {
  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
