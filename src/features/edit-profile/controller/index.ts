import { verifyService } from 'shared/components/verifier';
import { FormController } from 'shared/components/form';
import { isSomeValues } from 'shared/helpers';
import { ButtonFilled } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { EditProfileForm } from '../ui';

type TFieldUnion =
  | 'first_name'
  | 'second_name'
  | 'email'
  | 'phone'
  | 'login'
  | 'display_name';

const inputMap = {
  first_name: new Input({
    id: 'first_name',
    name: 'first_name',
    placeholder: 'First name',
    type: 'text',
    error: false,
    value: '',
  }),
  second_name: new Input({
    id: 'second_name',
    name: 'second_name',
    placeholder: 'Last name',
    type: 'text',
    error: false,
    value: '',
  }),
  email: new Input({
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    type: 'text',
    error: false,
    value: '',
  }),
  phone: new Input({
    id: 'phone',
    name: 'phone',
    placeholder: 'Phone',
    type: 'text',
    error: false,
    value: '',
  }),
  login: new Input({
    id: 'login',
    name: 'login',
    placeholder: 'Login',
    type: 'text',
    error: false,
    value: '',
  }),
  display_name: new Input({
    id: 'display_name',
    name: 'display_name',
    placeholder: 'Username',
    type: 'text',
    error: false,
    value: '',
  }),
};

const submitButton = new ButtonFilled({
  type: 'submit',
  label: 'Save',
  name: 'saveButton',
});

const form = new EditProfileForm({
  ...inputMap,
  submitButton,
});

const formElements = {
  form,
  inputMap,
  buttonMap: { submitButton },
};

const editProfileForm = new FormController<TFieldUnion>(formElements);

editProfileForm.onInputBlur((formData, setHints) => {
  const fieldHits = verifyService.verify<TFieldUnion>(formData);
  setHints(fieldHits);
});

editProfileForm.onStartSubmit((next, formData, setHints) => {
  const fieldHits = verifyService.verify(formData);
  if (isSomeValues(fieldHits)) {
    setHints(fieldHits);
  } else {
    next();
  }
});

editProfileForm.onRequest((reqState) => {
  const { fetching } = reqState;
  submitButton.setProps({ load: fetching, disabled: fetching });
});

editProfileForm.request((formData, update) => {
  console.log(formData);
  update({ error: '', fetching: true, success: false });
});

export { form };
