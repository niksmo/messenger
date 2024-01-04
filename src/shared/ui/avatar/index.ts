import { Block, type IBlockProps } from 'shared/components/block';
import imageTemplateSpec from './image.template.hbs';
import stubTemplateSpec from './stub.template.hbs';
import styles from './styles.module.css';

interface IAvatarProps {
  src?: string;
  name: string;
}

let curSrc = '';

function setNamePrefix(props: IBlockProps): IBlockProps {
  const { src, name } = props;
  const avatarImage = src as string;
  if (!avatarImage && typeof name === 'string') {
    props.namePrefix = name[0]?.toUpperCase();
    curSrc = '';
  } else {
    curSrc = avatarImage;
  }

  return props;
}

export class Avatar extends Block {
  constructor(props: IAvatarProps & IBlockProps) {
    setNamePrefix(props);

    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return curSrc ? imageTemplateSpec : stubTemplateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<IAvatarProps>): void {
    setNamePrefix(newProps);

    super.setProps(newProps);
  }
}
