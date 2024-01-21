export interface TSendMessageState {
  message: {
    content: string;
  };
}

export const messageState: TSendMessageState = {
  message: {
    content: '',
  },
};

export const MESSAGE_CONTENT = 'message.content';
