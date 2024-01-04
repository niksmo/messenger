import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { PATH } from 'shared/constants';
import templateSpec from './profile-settings-page.template.hbs';
import styles from './styles.module.css';

interface IPageSettingsProps extends IBlockProps {
  transitionButton: Block;
}

export class PageSettings extends Block<IPageSettingsProps> {
  constructor() {
    const button = new ButtonLight({
      label: 'Back to chats',
      name: 'transitionButton',
      type: 'button',
    });

    const transitionButton = new Link({
      href: PATH.MAIN,
      ariaHidden: true,
      children: button,
    });

    super({ transitionButton });
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
