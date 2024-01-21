import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store';
import { Bubble } from 'shared/ui/bubble/bubble-buddy.block';
import { BubbleOwn } from 'shared/ui/bubble/bubble-viewer.block';
import { normalizeTime } from 'shared/helpers/normalize';
import { withInterrupt } from 'shared/helpers/with';
import type { TChatState } from 'entites/chat/model/chat.model';
import type { TViewerState } from 'entites/viewer/model/viewer.model';
import templateSpec from './message-list.template.hbs';
import styles from './styles.module.css';

interface MessageListProps {
  messages: Array<Bubble | BubbleOwn>;
}

const store = Store.instance();

export class MessageList extends Block<MessageListProps> {
  constructor() {
    super({ messages: [] });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }

  private readonly _onStoreUpdate = ({
    chat,
    viewer,
  }: TChatState & TViewerState): void => {
    const { conversation } = chat;
    const { id: viewerId } = viewer;

    const messages = conversation.map(
      ({ user_id: userId, time: rawTime, content }) => {
        const time = normalizeTime(rawTime);
        return userId === viewerId
          ? new BubbleOwn({ content, time })
          : new Bubble({ content, time });
      }
    );

    this.setProps({ messages });

    const self = this;
    withInterrupt(() => {
      self.getContent().scrollIntoView(false);
    })();
  };
}
