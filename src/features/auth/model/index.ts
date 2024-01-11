interface InputState {
  error: boolean;
  value: string;
  hint: string;
}

export interface SigninState {
  signin: {
    login: InputState;
    password: InputState;
    error: string;
    load: boolean;
  };
}
