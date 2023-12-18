import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { WarnStub } from 'features/warn-stub';
import { InternalErrorPage } from './500-page';

const warnStub = new WarnStub({
  errCode: 500,
  message: 'Something went wrong. But we\xA0are already fixing\xA0it.',
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

const internalErrorPage = new InternalErrorPage({ warnStub, transitionButton });

export { internalErrorPage };
