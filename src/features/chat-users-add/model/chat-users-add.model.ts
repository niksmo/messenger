import type { TUser } from 'entites/chat-user/model/chat-user.model';

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
    found: TUser[];
    select: Array<TUser['id']>;
  };
}
