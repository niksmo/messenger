import type { TMessage } from 'entites/message/model/message.model';

export type TReceivedData = TMessage | TMessage[];

export interface TChatState {
  chat: {
    load: boolean;
    conversation: TMessage[];
  };
}

export const chatState: TChatState = {
  chat: {
    load: true,
    conversation: [],
  },
};

export const CHAT_LOAD = 'chat.load';
export const CHAT_CONVERSATION = 'chat.conversation';
