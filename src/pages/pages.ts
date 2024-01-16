import { SigninPage as Signin } from './signin';
import { SignupPage as Signup } from './signup';
import { MainPage as Main } from './main';
import { AddChatPage as AddChat } from './add-chat';
import { AddChatUsersPage as AddUsers } from './add-chat-users';
import { SettingsPage as Settings } from './profile-settings';
import { ChangeAvatarPage as ChangeAvatar } from './change-avatar';
import { ChangePasswordPage as ChangePassword } from './change-password';
import { EditProfilePage as EditProfile } from './edit-profile';
import { NotFoundPage as NotFound } from './404';
import { InternalErrorPage as InternalError } from './500';

const PAGE = {
  Signin,
  Signup,
  Main,
  AddChat,
  AddUsers,
  Settings,
  ChangeAvatar,
  ChangePassword,
  EditProfile,
  NotFound,
  InternalError,
};

export default PAGE;
