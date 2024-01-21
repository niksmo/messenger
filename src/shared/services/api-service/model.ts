export interface TSigninFormData {
  login: string;
  password: string;
}

export interface TSignupFormData {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
}

export interface TEditProfileFormData {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  display_name: string;
}

export interface TChangePasswordFormData {
  current_password: string;
  new_password: string;
}
