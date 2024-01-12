import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUT_PATH } from 'shared/constants';
import { SignupForm } from 'features/auth';
import templateSpec from './signup-page.template.hbs';
import styles from './styles.module.css';

interface IPageSignupProps extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageSignup extends Block<IPageSignupProps> {
  constructor() {
    const transitionButton = new Link({
      href: ROUT_PATH.SIGNIN,
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

  public setVisible(): void {
    this.getContent().style.display = 'flex';
  }
}
