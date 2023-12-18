export type TSigninFormData = {
  login: string;
  password: string;
};

export type TSignupFormData = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
};

export type TEditProfileFormData = {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  display_name: string;
};

export type TChangePasswordFormData = {
  current_password: string;
  new_password: string;
};
