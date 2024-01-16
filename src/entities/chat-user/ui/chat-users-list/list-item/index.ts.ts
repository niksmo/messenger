import { Block, type BlockProps } from 'shared/components/block';
import uuid from 'shared/packages/uuid';
import { Avatar } from 'shared/ui/avatar';
import styles from './styles.module.css';
import templateSpec from './chat-users-item.template.hbs';

type ChatUsersItemProps = BlockProps<{
  userId: number;
  avatar: string | null;
  firstName: string;
  secondName: string;
  displayName: string | null;
  added?: boolean;
  onInput?: (e: Event) => void;
}>;

type InnerProps = Omit<ChatUsersItemProps, 'avatar'> & {
  id: string;
  avatarBlock: Block;
};

export class ChatUsersItem extends Block<InnerProps> {
  constructor({
    avatar,
    firstName,
    secondName,
    displayName,
    userId,
    onInput,
  }: ChatUsersItemProps) {
    const avatarBlock = new Avatar({
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      name: displayName || firstName || secondName,
      src: avatar,
    });
    super({
      id: uuid(),
      userId,
      avatarBlock,
      firstName,
      secondName,
      displayName,
      onInput,
    });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
