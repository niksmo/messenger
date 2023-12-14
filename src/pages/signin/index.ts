import { form, informMsg as message } from '../../features/signin';
import { ButtonLight } from '../../shared/ui/button';
import { PageSignin } from './signin-page';

const transitionButton = new ButtonLight({
  label: 'Sign up',
  name: 'transitionButton',
  type: 'button',
  onClick(e) {
    e.preventDefault();
  },
});

const signinPage = new PageSignin({
  message,
  form,
  transitionButton,
});

export { signinPage };
