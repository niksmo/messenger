export type TFieldUnion =
  | 'first_name'
  | 'second_name'
  | 'display_name'
  | 'login'
  | 'email'
  | 'phone';

export interface TInputState {
  error: boolean;
  value: string;
  hint: string;
}

type TFieldsState = Record<TFieldUnion, TInputState>;

export interface TEditProfileState {
  editProfile: {
    fields: TFieldsState;
    load: boolean;
  };
}
