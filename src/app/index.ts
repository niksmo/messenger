import { registerPaths, routerProvider } from 'shared/components/router';
import { signinPage } from 'pages/signin';
import app from './app';
import { signupPage } from 'pages/signup';

routerProvider(app);

registerPaths([
  ['/signin/', signinPage],
  ['/signup/', signupPage],
]);

app.setProps({ page: signinPage });

export default app;
