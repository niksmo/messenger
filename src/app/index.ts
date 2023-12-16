import { registerPaths, routerProvider } from 'shared/components/router';
import { signinPage } from 'pages/signin';
import { signupPage } from 'pages/signup';
import { editProfilePage } from 'pages/edit-profile';
import app from './app';

routerProvider(app);

registerPaths([
  ['/signin/', signinPage],
  ['/signup/', signupPage],
  ['/edit-profile/', editProfilePage],
]);

app.setProps({ page: signinPage });

export default app;
