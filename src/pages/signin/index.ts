import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { PATH } from 'shared/constants';
import { form, informMsg as message } from 'features/signin';
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
      name: 'transitionButton',
      type: 'button',
    });

    const transitionButton = new Link({
      href: PATH.SIGNUP,
      ariaHidden: true,
      children: button,
    });

    super({ message, form, transitionButton });
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
