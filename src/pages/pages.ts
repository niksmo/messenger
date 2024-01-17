import { SigninPage as Signin } from './signin/signin-page.block';
import { SignupPage as Signup } from './signup/signup-page.block';
import { MainPage as Main } from './main/main-page.block';
import { AddChatPage as AddChat } from './chat-add/add-chat-page.block';
import { AddChatUsersPage as AddUsers } from './chat-users-add/add-chat-users-page.block';
import { SettingsPage as Settings } from './profile-settings/profile-settings-page.block';
import { ChangeAvatarPage as ChangeAvatar } from './change-avatar/change-avatar-page.block';
import { ChangePasswordPage as ChangePassword } from './change-password/change-password-page.block';
import { EditProfilePage as EditProfile } from './edit-profile/edit-profile-page.block';
import { NotFoundPage as NotFound } from './404/404-page.block';
import { InternalErrorPage as InternalError } from './500/500-page.block';

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
