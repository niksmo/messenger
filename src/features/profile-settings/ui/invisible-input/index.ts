import { Block } from 'shared/components/block';
import { changeAvatarController } from '../../controller';
import templateSpec from './invisible-input.template.hbs';
import styles from './styles.module.css';

export class InvisibleFileInput extends Block {
  constructor() {
    super();
    this.setProps({
      name: 'changeAvatar',
      onChange: this._onChange.bind(this),
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  private _onChange(e: Event): void {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { files } = target;
      if (files?.[0]) {
        const avatar = files[0];
        changeAvatarController.preview(avatar);
      }
    }
  }
}
