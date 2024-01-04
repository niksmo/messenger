import { NotFoundPage as NotFound } from './404';
import { InternalErrorPage as InternalError } from './500';
import { PageChangePassword as ChangePassword } from './change-password';
import { PageEditProfile as EditProfile } from './edit-profile';
import { PageMain as Main } from './main';
import { PageSettings as Settings } from './profile-settings';
import { PageSignin as Signin } from './signin';
import { PageSignup as Signup } from './signup';

const PAGE = {
  NotFound,
  InternalError,
  ChangePassword,
  EditProfile,
  Main,
  Settings,
  Signin,
  Signup,
};

export default PAGE;
