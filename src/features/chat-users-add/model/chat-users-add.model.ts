import type { TUser } from 'entites/chat-user/model/chat-user.model';

export const fieldList = ['login'];

export type TFieldUnion = 'login';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TFoundUser extends TUser {
  isAdded: boolean;
}

export interface TAddUsersState {
  addUsers: {
    fields: TFieldsState;
    load: boolean;
    found: TFoundUser[];
    select: Array<TUser['id']>;
  };
}
