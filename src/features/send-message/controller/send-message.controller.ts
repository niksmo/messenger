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
    const { message } = this._store.getState<TSendMessageState>();

    if (!message.content) {
      return;
    }

    chatController.send(message.content);
    message.content = '';
  }
}

const sendMessageController = new SendMessageController();

export { sendMessageController };
