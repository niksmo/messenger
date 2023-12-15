import { registerPaths, routerProvider } from 'shared/components/router';
import { signinPage } from 'pages/signin';
import app from './app';

routerProvider(app);

registerPaths([['/signin/', signinPage]]);

app.setProps({ page: signinPage });

export default app;
