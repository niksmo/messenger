import { Button } from './_button-base.block';
import baseStyles from './styles-base.module.css';
import outlinedStyles from './styles-outlined.module.css';

const styles = { ...baseStyles, ...outlinedStyles };

export class ButtonOutlined extends Button {
  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
