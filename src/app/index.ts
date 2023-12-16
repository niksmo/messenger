import { registerPaths, routerProvider } from 'shared/components/router';
import { signinPage } from 'pages/signin';
import { signupPage } from 'pages/signup';
import { editProfilePage } from 'pages/edit-profile';
import { changePasswordPage } from 'pages/change-password';
import { notFoundPage } from 'pages/404';
import { internalErrorPage } from 'pages/500';
import app from './app';
routerProvider(app);

registerPaths([
  ['/signin/', signinPage],
  ['/signup/', signupPage],
  ['/edit-profile/', editProfilePage],
  ['/change-password/', changePasswordPage],
  ['/404/', notFoundPage],
  ['/500/', internalErrorPage],
]);

app.setProps({ page: signinPage });

export default app;
