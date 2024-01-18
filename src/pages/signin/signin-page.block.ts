import { Link } from 'shared/components/router/link.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { SigninMessage } from 'features/auth/ui/signin-message/signin-message.block';
import { SigninForm } from 'features/auth/ui/signin-form/signin-form.block';
import templateSpec from './signin-page.template.hbs';
import styles from './styles.module.css';
import { Block } from 'shared/components/block/block';

interface SigninPageProps {
  message: Block;
  form: Block;
  transitionButton: Block;
}

export class SigninPage extends Block<SigninPageProps> {
  constructor() {
    const transitionButton = new Link({
      href: ROUTE_PATH.SIGNUP,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Sign up',
        type: 'button',
      }),
    });

    const message = new SigninMessage();

    const form = new SigninForm();

    super({ message, form, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
