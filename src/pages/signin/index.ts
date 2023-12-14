// import {
//   signinForm as form,
//   responseMsg as message,
// } from '../../features/signin/controller';
import {
  form,
  responseMsg as message,
} from '../../features/signin/controller/newtest';
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
