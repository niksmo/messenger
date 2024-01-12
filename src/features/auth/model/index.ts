interface InputState {
  error: boolean;
  value: string;
  hint: string;
}

export interface ISigninState {
  signin: {
    login: InputState;
    password: InputState;
    error: string;
    load: boolean;
  };
}

export interface ISignupState {
  signup: {
    first_name: InputState;
    second_name: InputState;
    email: InputState;
    phone: InputState;
    login: InputState;
    password: InputState;
    confirm: InputState;
    load: boolean;
  };
}
