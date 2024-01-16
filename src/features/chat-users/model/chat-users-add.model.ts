export const fieldList = ['login'];

export type TFieldUnion = 'login';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TAddUsersState {
  addUsers: {
    fields: TFieldsState;
    load: boolean;
    chatId: number;
  };
}
