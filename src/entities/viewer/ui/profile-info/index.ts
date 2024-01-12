import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store';
import { Avatar } from 'shared/ui/avatar';
import { type IViewerState } from 'entites/viewer/model';
import { InvisibleFileInput } from 'features/change-avatar';
import templateSpec from './profile-info.template.hbs';
import styles from './styles.module.css';

const store = Store.instance();

export class ProfileInfo extends Block {
  private readonly _onStoreUpdate;

  constructor() {
    const {
      avatar: src,
      first_name: name,
      ...rest
    } = store.getState<IViewerState>().viewer;

    const avatar = new Avatar({ src, name });
    const changeAvatar = new InvisibleFileInput();

    super({ avatar, changeAvatar, ...rest });

    this._onStoreUpdate = (state: IViewerState) => {
      const { avatar: src, first_name: name, ...rest } = state.viewer;
      avatar.setProps({ src, name });
      this.setProps(rest);
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
