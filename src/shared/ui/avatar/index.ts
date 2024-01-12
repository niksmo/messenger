import { Block, type IBlockProps } from 'shared/components/block';
import { setNamePrefixToProps } from './lib';
import imageTemplateSpec from './image.template.hbs';
import stubTemplateSpec from './stub.template.hbs';
import styles from './styles.module.css';

interface IAvatarProps extends IBlockProps {
  src: null | string;
  name: string;
}

export class Avatar extends Block<IAvatarProps> {
  private readonly _imageSrc: string | null;

  constructor(props: IAvatarProps) {
    const { src } = props;
    setNamePrefixToProps(props);

    super(props);

    this._imageSrc = src;
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return this._imageSrc ? imageTemplateSpec : stubTemplateSpec;
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
