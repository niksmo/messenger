import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './item.template.hbs';
import styleModule from './styles.module.css';

const STYLE_TAG = 'menu-item_style';

const STYLE = {
  primary: 'menu-item_style_primary',
  accent: 'menu-item_style_accent',
  adverse: 'menu-item_style_adverse',
};

type TIcon =
  | 'plus'
  | 'new-contact'
  | 'remove-contact'
  | 'bucket'
  | 'media'
  | 'file'
  | 'profile'
  | 'lock'
  | 'close';

type TStyle = 'primary' | 'adverse' | 'accent';

type MenuItemProps = BlockProps<{
  icon: TIcon;
  label: string;
  style: TStyle;
  onClick?: (e: Event) => void;
}>;

const styles = { ...styleModule };

let curStyle: TStyle;

export class MenuItem extends Block<MenuItemProps> {
  constructor(props: MenuItemProps) {
    const { style } = props;
    curStyle = style;
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    const itemStyle = styles[STYLE[curStyle]];
    if (itemStyle) {
      styles[STYLE_TAG] = itemStyle;
    }
    return styles;
  }
}
