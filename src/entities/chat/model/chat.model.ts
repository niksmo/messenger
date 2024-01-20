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
