import { PageSignin as Signin } from './signin';
import { PageSignup as Signup } from './signup';
import { PageMain as Main } from './main';
import { PageAddChat as AddChat } from './add-chat';
import { PageSettings as Settings } from './profile-settings';
import { PageChangeAvatar as ChangeAvatar } from './change-avatar';
import { PageChangePassword as ChangePassword } from './change-password';
import { PageEditProfile as EditProfile } from './edit-profile';
import { NotFoundPage as NotFound } from './404';
import { InternalErrorPage as InternalError } from './500';

const PAGE = {
  Signin,
  Signup,
  Main,
  AddChat,
  Settings,
  ChangeAvatar,
  ChangePassword,
  EditProfile,
  NotFound,
  InternalError,
};

export default PAGE;
