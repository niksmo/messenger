import { Block, type BlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { SignupForm } from 'features/auth/ui/signup/form';
import templateSpec from './signup-page.template.hbs';
import styles from './styles.module.css';

type SignupPageProps = BlockProps<{
  form: Block;
  transitionButton: Block;
}>;

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
