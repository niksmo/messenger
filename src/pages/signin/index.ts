import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUT_PATH } from 'shared/constants';
import { SigninForm, SigninMessage } from 'features/auth/ui';
import templateSpec from './signin-page.template.hbs';
import styles from './styles.module.css';

interface IPageSigninProps extends IBlockProps {
  message: Block;
  form: Block;
  transitionButton: Block;
}

export class PageSignin extends Block<IPageSigninProps> {
  constructor() {
    const button = new ButtonLight({
      label: 'Sign up',
      type: 'button',
    });

    const transitionButton = new Link({
      href: ROUT_PATH.SIGNUP,
      ariaHidden: true,
      children: button,
    });

    const form = new SigninForm();

    const message = new SigninMessage();

    super({ message, form, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
