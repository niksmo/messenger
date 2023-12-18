import { form } from 'features/change-password';
import { ButtonLight } from 'shared/ui/button';
import { PageSignup } from './change-password-page';
import { Link } from 'shared/components/router';

const button = new ButtonLight({
  label: 'Cancel',
  name: 'transitionButton',
  type: 'button',
});

const transitionButton = new Link({
  href: '/',
  ariaHidden: true,
  children: button,
});

const changePasswordPage = new PageSignup({
  form,
  transitionButton,
});

export { changePasswordPage };
