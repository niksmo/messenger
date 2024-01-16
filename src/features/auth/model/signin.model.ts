export const fieldList = ['login', 'password'];

export type TFieldUnion = 'login' | 'password';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TSigninState {
  signin: {
    fields: TFieldsState;
    error: string;
    load: boolean;
  };
}
