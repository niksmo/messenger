export const fieldList = ['current_password', 'new_password', 'confirm'];

export type TFieldUnion = 'current_password' | 'new_password' | 'confirm';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TChangePasswordState {
  changePassword: {
    fields: TFieldsState;
    load: boolean;
  };
}
