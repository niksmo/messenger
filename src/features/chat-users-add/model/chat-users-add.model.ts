export const fieldList = ['login'];

export type TFieldUnion = 'login';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

interface TUser {
  id: number;
  first_name: string;
  second_name: string;
  avatar: string | null;
}

export interface TAddUsersState {
  addUsers: {
    fields: TFieldsState;
    load: boolean;
  };
  found: TUser[];
  select: Array<TUser['id']>;
}
