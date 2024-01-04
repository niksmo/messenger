import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './icon-button.template.hbs';
import initStyles from './styles.module.css';

const STYLE = {
  primary: 'icon-button_style_primary',
  secondary: 'icon-button_style_secondary',
  accent: 'icon-button_style_accent',
};

type TIcon =
  | 'add-chat'
  | 'menu'
  | 'backward'
  | 'dots'
  | 'paperclip'
  | 'paperplane';

type TStyle = keyof typeof STYLE;

interface IIconButtonProps extends IBlockProps {
  type: 'button' | 'submit';
  icon: TIcon;
  style: TStyle;
  children?: Block | Block[];
  role: string;
  ariaLabel: string;
  onClick?: (e: Event) => void;
}

let curStyle: TStyle = 'primary';

const styles = { ...initStyles };

export class IconButton extends Block<IIconButtonProps> {
  constructor(props: IIconButtonProps) {
    curStyle = props.style;
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    styles['icon-button_style'] = styles[STYLE[curStyle]] ?? '';
    return styles;
  }

  public setProps(newProps: Partial<IIconButtonProps>): void {
    const { style } = newProps;
    curStyle = style ?? curStyle;

    super.setProps(newProps);
  }
}
