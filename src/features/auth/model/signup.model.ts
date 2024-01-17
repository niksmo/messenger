export const fieldList = [
  'first_name',
  'second_name',
  'email',
  'phone',
  'login',
  'password',
  'confirm',
];

type TFieldUnion =
  | 'first_name'
  | 'second_name'
  | 'email'
  | 'phone'
  | 'login'
  | 'password'
  | 'confirm';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TSignupState {
  signup: {
    fields: TFieldsState;
    load: boolean;
  };
}
