import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { form } from 'features/edit-profile';
import templateSpec from './edit-profile-page.template.hbs';
import styles from './styles.module.css';
import { PATH } from 'shared/constants';

interface IPageEditProfile extends IBlockProps {
  form: Block;
  transitionButton: Block;
}

export class PageEditProfile extends Block<IPageEditProfile> {
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
