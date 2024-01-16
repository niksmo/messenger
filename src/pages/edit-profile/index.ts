import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { EditProfileForm } from 'features/profile-settings/ui/edit-profile-form';
import templateSpec from './edit-profile-page.template.hbs';
import styles from './styles.module.css';

interface IPageEditProfile extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageEditProfile extends Block<IPageEditProfile> {
  constructor() {
    const transitionButton = new Link({
      href: ROUTE_PATH.SETTINGS,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Cancel',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    const form = new EditProfileForm();

    super({ form, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
