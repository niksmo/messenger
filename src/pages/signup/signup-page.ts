import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './signup-page.template.hbs';
import styles from './styles.module.css';

interface IPageSignupProps {
  form: Block;
  transitionButton: Block;
}

export class PageSignup extends Block {
  constructor(props: IPageSignupProps & IBlockProps) {
    super(props);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  protected _getStylesModule() {
    return styles;
  }

  public setProps(newProps: Partial<IPageSignupProps>) {
    super.setProps(newProps);
  }
}
