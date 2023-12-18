import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { WarnStub } from 'features/warn-stub';
import { NotFoundPage } from './404-page';

const warnStub = new WarnStub({
  errCode: 404,
  message: 'The page no\xA0longer exists or\xA0it\xA0never existed.',
});

const button = new ButtonLight({
  label: 'Back to chats',
  name: 'transitionButton',
  type: 'button',
});

const transitionButton = new Link({
  href: '/',
  ariaHidden: true,
  children: button,
});

const notFoundPage = new NotFoundPage({ warnStub, transitionButton });

export { notFoundPage };
