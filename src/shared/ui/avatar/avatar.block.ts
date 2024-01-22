import { Block } from 'shared/components/block/block';
import templateSpec from './avatar.template.hbs';
import styles from './styles.module.css';

interface AvatarProps {
  src: null | string;
  name: string;
}

interface InnerProps extends AvatarProps {
  namePrefix: string;
}

function getNamePrefix(name?: string): string {
  let prefix = '';
  if (!name?.[0]) {
    return prefix;
  }

  prefix = name[0].toUpperCase();

  return prefix;
}

export class Avatar extends Block<InnerProps> {
  constructor(props: AvatarProps) {
    const { name } = props;
    super({ namePrefix: getNamePrefix(name), ...props });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public setProps(props: Partial<AvatarProps>): void {
    const { name } = props;
    super.setProps({ namePrefix: getNamePrefix(name), ...props });
  }
}
