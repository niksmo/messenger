import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import templateSpec from './signup-page.template.hbs';
import styles from './styles.module.css';
import { SignupForm } from 'features/auth/ui/signup/form';

interface IPageSignupProps extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageSignup extends Block<IPageSignupProps> {
  constructor() {
    const transitionButton = new Link({
      href: ROUTE_PATH.SIGNIN,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Sign in',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    const form = new SignupForm();

    super({ form, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
