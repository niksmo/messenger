import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './header.template.hbs';
import styles from './styles.module.css';

interface IChatHeaderProps extends IBlockProps {
  username: string;
  avatar: Block;
  menu: Block;
}

export class ChatHeader extends Block<IChatHeaderProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IChatHeaderProps>): void {
    super.setProps(newProps);
  }
}
