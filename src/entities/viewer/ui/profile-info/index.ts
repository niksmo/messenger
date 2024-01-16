import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { Avatar } from 'shared/ui/avatar';
import { InvisibleFileInput } from 'features/profile-settings/ui/invisible-input';
import { type IViewerState } from '../../model';
import templateSpec from './profile-info.template.hbs';
import styles from './styles.module.css';

const store = Store.instance();

export class ProfileInfo extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    const { viewer } = store.getState<IViewerState>();
    const { avatar: src, first_name: name, ...rest } = viewer;

    const avatar = new Avatar({ src, name });
    const changeAvatar = new InvisibleFileInput();

    super({ avatar, changeAvatar, first_name: name, ...rest });

    this._onStoreUpdate = (state: IViewerState) => {
      const { avatar: src, first_name: name, ...rest } = state.viewer;
      avatar.setProps({ src, name });
      this.setProps({ first_name: name, ...rest });
    };

    store.on<IViewerState>(this._onStoreUpdate);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
