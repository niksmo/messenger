import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './item.template.hbs';
import styleModule from './styles.module.css';

const STYLE_TAG = 'menu-item_style';

const STYLE = {
  primary: 'menu-item_style_primary',
  adverse: 'menu-item_style_adverse',
};

type TIcon24 =
  | 'new-contact'
  | 'bucket'
  | 'media'
  | 'file'
  | 'profile'
  | 'lock'
  | 'close';

type TItemStyle = 'primary' | 'adverse';

interface IMenuItemProps extends IBlockProps {
  icon: TIcon24;
  label: string;
  style: TItemStyle;
  onClick?: (e: Event) => void;
}

const styles = { ...styleModule };

let curStyle: TItemStyle;

export class MenuItem extends Block<IMenuItemProps> {
  constructor(props: IMenuItemProps) {
    const { style } = props;
    curStyle = style;
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    const itemStyle = styles[STYLE[curStyle]];
    if (itemStyle) {
      styles[STYLE_TAG] = itemStyle;
    }
    return styles;
  }
}
