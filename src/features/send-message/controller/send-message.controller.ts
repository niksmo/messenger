import { Store } from 'shared/components/store/store';
import {
  MESSAGE_CONTENT,
  type TSendMessageState,
} from '../model/send-message.model';
import { chatController } from 'entites/chat/controller/chat.controller';

export class SendMessageController {
  private readonly _store;

  constructor() {
    this._store = Store.instance();
  }

  public input({ target }: Event): void {
    if (target instanceof HTMLInputElement) {
      this._store.set(MESSAGE_CONTENT, target.value);
    }
  }

  public send(): void {
    const { content } = this._store.getState<TSendMessageState>().message;
    chatController.send(content);
  }
}

const sendMessageController = new SendMessageController();

export { sendMessageController };
