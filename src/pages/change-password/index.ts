import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { form } from 'features/change-password';
import templateSpec from './change-password-page.template.hbs';
import styles from './styles.module.css';
import { PATH } from 'shared/constants';

interface IPageChangePasswordProps extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageChangePassword extends Block<IPageChangePasswordProps> {
  constructor() {
    const button = new ButtonLight({
      label: 'Cancel',
      name: 'transitionButton',
      type: 'button',
    });

    const transitionButton = new Link({
      href: PATH.MAIN,
      ariaHidden: true,
      children: button,
    });

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
