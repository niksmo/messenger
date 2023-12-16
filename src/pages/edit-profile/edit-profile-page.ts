import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './edit-profile-page.template.hbs';
import styles from './styles.module.css';

interface IPageEditProfile {
  form: Block;
  transitionButton: Block;
}

export class PageEditProfile extends Block {
  constructor(props: IPageEditProfile & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  protected _getStylesModule() {
    return styles;
  }

  public setProps(newProps: Partial<IPageEditProfile>) {
    super.setProps(newProps);
  }
}
