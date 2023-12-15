import { form } from 'features/signup';
import { ButtonLight } from 'shared/ui/button';
import { PageSignup } from './signup-page';
import { Link } from 'shared/components/router';

const button = new ButtonLight({
  label: 'Sign up',
  name: 'transitionButton',
  type: 'button',
});

const transitionButton = new Link({
  href: '/signin/',
  ariaHidden: true,
  children: button,
});

const signupPage = new PageSignup({
  form,
  transitionButton,
});

export { signupPage };
