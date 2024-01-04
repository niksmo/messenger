import { form } from 'features/edit-profile';
import { ButtonLight } from 'shared/ui/button';
import { PageEditProfile } from './edit-profile-page';
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

const editProfilePage = new PageEditProfile({
  form,
  transitionButton,
});

export { editProfilePage };
