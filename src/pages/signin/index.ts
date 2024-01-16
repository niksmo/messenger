import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { SigninMessage } from 'features/auth/ui/signin/message';
import { SigninForm } from 'features/auth/ui/signin/form';
import templateSpec from './signin-page.template.hbs';
import styles from './styles.module.css';

interface IPageSigninProps extends IBlockProps {
  message: Block;
  form: Block;
  transitionButton: Block;
}

export class PageSignin extends Block<IPageSigninProps> {
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

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
