import { registerPaths, routerProvider } from 'shared/components/router';
import { signinPage } from 'pages/signin';
import { signupPage } from 'pages/signup';
import { editProfilePage } from 'pages/edit-profile';
import { changePasswordPage } from 'pages/change-password';
import app from './app';
routerProvider(app);

registerPaths([
  ['/signin/', signinPage],
  ['/signup/', signupPage],
  ['/edit-profile/', editProfilePage],
  ['/change-password/', changePasswordPage],
]);

app.setProps({ page: signinPage });

export default app;
