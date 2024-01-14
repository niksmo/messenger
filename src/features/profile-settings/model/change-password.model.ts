interface IInputState {
  value: string;
  error: boolean;
  hint: string;
}

export interface IChangePasswordState {
  changePassword: {
    current_password: IInputState;
    new_password: IInputState;
    confirm: IInputState;
    load: boolean;
  };
}
