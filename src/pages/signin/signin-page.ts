import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './signin-page.template.hbs';
import styles from './styles.module.css';

interface IPageSigninProps {
  message: Block;
  form: Block;
  transitionButton: Block;
}

export class PageSignin extends Block {
  constructor(props: IPageSigninProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  protected _getStylesModule() {
    return styles;
  }

  public setProps(newProps: Partial<IPageSigninProps>) {
    super.setProps(newProps);
  }
}
