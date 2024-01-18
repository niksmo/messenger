import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { SignupForm } from 'features/auth/ui/signup-form/signup-form.block';
import templateSpec from './signup-page.template.hbs';
import styles from './styles.module.css';

interface SignupPageProps {
  form: Block;
  transitionButton: Block;
}

export class SignupPage extends Block<SignupPageProps> {
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

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
