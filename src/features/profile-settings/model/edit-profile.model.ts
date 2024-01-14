export interface IFieldState {
  value: string;
  error: boolean;
  hint: string;
}

export interface IEditProfileState {
  editProfile: {
    first_name: IFieldState;
    second_name: IFieldState;
    display_name: IFieldState;
    login: IFieldState;
    email: IFieldState;
    phone: IFieldState;
    load: boolean;
  };
}
