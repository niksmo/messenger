import { Block } from 'shared/components/block/block';
import { Avatar } from 'shared/ui/avatar/avatar.block';
import styles from './styles.module.css';
import templateSpec from './chat-users-item.template.hbs';

interface ChatUsersItemProps {
  avatar: string | null;
  displayName: string | null;
  firstName: string;
  secondName: string;
  login: string;
  status: null | string;
}

interface InnerProps {
  blockAvatar: Block;
  displayName: string | null;
  firstName: string;
  secondName: string;
  login: string;
  status: null | string;
}

export class ChatUsersItem extends Block<InnerProps> {
  constructor({
    avatar,
    displayName,
    firstName,
    secondName,
    ...restProps
  }: ChatUsersItemProps) {
    const blockAvatar = new Avatar({
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      name: displayName || firstName || secondName,
      src: avatar,
    });
    super({ blockAvatar, displayName, firstName, secondName, ...restProps });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
