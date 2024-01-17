import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store/store';
import { Avatar } from 'shared/ui/avatar';
import { InvisibleFileInput } from 'features/profile-settings/ui/invisible-input';
import { type TViewerState } from '../../model';
import templateSpec from './profile-info.template.hbs';
import styles from './styles.module.css';

const store = Store.instance();

export class ProfileInfo extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    const { viewer } = store.getState<TViewerState>();
    const { avatar: src, first_name: name, ...rest } = viewer;

    const avatar = new Avatar({ src, name });
    const changeAvatar = new InvisibleFileInput();

    super({ avatar, changeAvatar, first_name: name, ...rest });

    this._onStoreUpdate = (state: TViewerState) => {
      const { avatar: src, first_name: name, ...rest } = state.viewer;
      avatar.setProps({ src, name });
      this.setProps({ first_name: name, ...rest });
    };

    store.on<TViewerState>(this._onStoreUpdate);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }
}
