import { Block, type BlockProps } from 'shared/components/block';
import { setNamePrefixToProps } from './lib';
import templateSpec from './avatar.template.hbs';
import styles from './styles.module.css';

type AvatarProps = BlockProps<{
  src: null | string;
  name: string;
}>;

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    setNamePrefixToProps(props);
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public setProps(newProps: Partial<AvatarProps>): void {
    if (newProps.name) {
      setNamePrefixToProps(newProps);
    }
    super.setProps(newProps);
  }
}
