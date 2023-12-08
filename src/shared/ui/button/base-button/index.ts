import { Block, IBlockProps } from '../../block';
import templateSpec from './button.template.hbs';
import baseStyles from './styles-base.module.css';
import filledStyles from './styles-filled.module.css';
import outlinedStyles from './styles-outlined.module.css';
import lightStyles from './styles-light.module.css';

const LOOK_STYLE = {
  filled: filledStyles,
  outlined: outlinedStyles,
  light: lightStyles,
};

interface IButtonProps extends IBlockProps {
  label: string;
  type: 'button' | 'submit';
  look: keyof typeof LOOK_STYLE;
  click?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    const { look } = props;

    const styles = Object.assign(baseStyles, LOOK_STYLE[look]);
    super(props, styles);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<Pick<IButtonProps, 'label' | 'click'>>) {
    super.setProps(newProps);
  }
}
