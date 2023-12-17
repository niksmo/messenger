import { BlockInput } from 'shared/components/block';
import templateSpec from './upload-avatar.template.hbs';
import styles from './styles.module.css';

export class ChangeAvatarButton extends BlockInput {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
