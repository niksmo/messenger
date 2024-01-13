import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import templateSpec from './edit-profile-page.template.hbs';
import styles from './styles.module.css';
import { ROUTE_PATH } from 'shared/constants';
import { EditProfileForm } from 'features/edit-profile';

interface IPageEditProfile extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageEditProfile extends Block<IPageEditProfile> {
  constructor() {
    const button = new ButtonLight({
      label: 'Cancel',
      name: 'transitionButton',
      type: 'button',
    });

    const transitionButton = new Link({
      href: ROUTE_PATH.SETTINGS,
      ariaHidden: true,
      children: button,
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
