import { Block } from 'shared/components/block/block';
import templateSpec from './icon-button.template.hbs';
import initStyles from './styles.module.css';

const STYLE = {
  primary: 'icon-button_style_primary',
  secondary: 'icon-button_style_secondary',
  accent: 'icon-button_style_accent',
};

export type TIcon =
  | 'add-chat'
  | 'menu'
  | 'gear'
  | 'backward'
  | 'dots'
  | 'paperclip'
  | 'paperplane';

export type TStyle = 'primary' | 'secondary' | 'accent';

interface IconButtonProps {
  id?: string;
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

export class IconButton extends Block<IconButtonProps> {
  constructor(props: IconButtonProps) {
    curStyle = props.style;
    super({ ...props });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    styles['icon-button_style'] = styles[STYLE[curStyle]] ?? '';
    return styles;
  }

  public setProps(props: Partial<IconButtonProps>): void {
    const { style } = props;
    curStyle = style ?? curStyle;

    super.setProps(props);
  }
}
