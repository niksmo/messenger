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

export interface IViewerState {
  viewer: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
  };
}
