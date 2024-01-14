import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { ChangePasswordForm } from 'features/profile-settings';
import templateSpec from './change-password-page.template.hbs';
import styles from './styles.module.css';

interface IPageChangePasswordProps extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageChangePassword extends Block<IPageChangePasswordProps> {
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

    const form = new ChangePasswordForm();

    super({ form, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
