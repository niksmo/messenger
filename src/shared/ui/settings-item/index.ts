import { Block } from 'shared/components/block';
import templateSpec from './settings-item.template.hbs';
import stylesModule from './styles.module.css';

type TIcon24 =
  | 'new-contact'
  | 'bucket'
  | 'media'
  | 'file'
  | 'profile'
  | 'lock'
  | 'close';

type TStyle = 'accent' | 'adverse';

interface ISettingsItemProps {
  style: TStyle;
  icon: TIcon24;
  label: string;
}

const styles = { ...stylesModule };

const STYLE_TAG = 'nav-item_style';

const STYLE_MAP = {
  accent: 'nav-item_style_accent',
  adverse: 'nav-item_style_adverse',
};

let curStyle: TStyle = 'accent';

export class SettingsItem extends Block {
  constructor(props: ISettingsItemProps) {
    const { style } = props;
    curStyle = style;
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    const stValue = styles[STYLE_MAP[curStyle]];
    if (stValue) {
      styles[STYLE_TAG] = stValue;
    }
    return styles;
  }
}
