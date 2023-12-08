import { Block, IBlockProps } from '../../../../shared/ui/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

interface ISigninMessage extends IBlockProps {
  visible: boolean;
}

export class SigninMessage extends Block {
  constructor(props: ISigninMessage) {
    super(props, styles);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public setProps(newProps: Partial<ISigninMessage>) {
    super.setProps(newProps);
  }
}
