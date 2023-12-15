import { form, informMsg as message } from 'features/signin';
import { ButtonLight } from 'shared/ui/button';
import { PageSignin } from './signin-page';
import { Link } from 'shared/components/router';

const button = new ButtonLight({
  label: 'Sign up',
  name: 'transitionButton',
  type: 'button',
  onClick(e) {
    e.preventDefault();
  },
});

const transitionButton = new Link({
  href: '/signup/',
  ariaHidden: true,
  children: button,
});

const signinPage = new PageSignin({
  message,
  form,
  transitionButton,
});

export { signinPage };
