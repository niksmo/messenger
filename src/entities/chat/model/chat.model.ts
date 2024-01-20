export interface TChatState {
  chat: {
    load: boolean;
    conversation: unknown[];
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
