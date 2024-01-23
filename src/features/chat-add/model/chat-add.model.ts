export const fieldList = ['title'];

export type TFieldUnion = 'title';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TAddChatState {
  addChat: {
    fields: TFieldsState;
    load: boolean;
  };
}
