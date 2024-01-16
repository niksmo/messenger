import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './settings-item.template.hbs';
import stylesModule from './styles.module.css';

type TIcon =
  | 'new-contact'
  | 'bucket'
  | 'media'
  | 'file'
  | 'profile'
  | 'lock'
  | 'close';

type TStyle = 'accent' | 'adverse';

type SettingsItemProps = BlockProps<{
  style: TStyle;
  icon: TIcon;
  label: string;
}>;

const styles = { ...stylesModule };

const STYLE_TAG = 'nav-item_style';

const STYLE_MAP = {
  accent: 'nav-item_style_accent',
  adverse: 'nav-item_style_adverse',
};

let curStyle: TStyle = 'accent';

export class SettingsItem extends Block<SettingsItemProps> {
  constructor(props: SettingsItemProps) {
    const { style } = props;
    curStyle = style;
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    const stValue = styles[STYLE_MAP[curStyle]];
    if (stValue) {
      styles[STYLE_TAG] = stValue;
    }
    return styles;
  }
}
