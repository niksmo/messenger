import { Block, type IBlockProps } from 'shared/components/block';
import { setNamePrefixToProps } from './lib';
import templateSpec from './avatar.template.hbs';
import styles from './styles.module.css';

interface IAvatarProps extends IBlockProps {
  src: null | string;
  name: string;
}

export class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    setNamePrefixToProps(props);
    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    // return this._imageSrc ? imageTemplateSpec : stubTemplateSpec;
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IAvatarProps>): void {
    if (newProps.name) {
      setNamePrefixToProps(newProps);
    }
    super.setProps(newProps);
  }
}
