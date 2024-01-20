export interface TChatMetaData {
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
}

export interface TChatState {
  chat: {
    id: number | null;
    meta: TChatMetaData | null;
    load: boolean;
    conversation: unknown[];
  };
}

export const chatState: TChatState = {
  chat: {
    id: null,
    meta: null,
    load: true,
    conversation: [],
  },
};
