import { verifyService } from 'shared/components/verifier';
import { API } from 'shared/services/api-service';
import { FormController } from 'shared/components/form';
import { isSomeValues } from 'shared/helpers';
import { ButtonFilled } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { SignupForm } from '../ui';

type TFieldUnion =
  | 'first_name'
  | 'second_name'
  | 'email'
  | 'phone'
  | 'login'
  | 'password'
  | 'confirm';

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
  password: new Input({
    id: 'password',
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    error: false,
    value: '',
  }),
  confirm: new Input({
    id: 'confirm',
    name: 'confirm',
    placeholder: 'Confirm password',
    type: 'password',
    error: false,
    value: '',
  }),
};

const submitButton = new ButtonFilled({
  type: 'submit',
  label: 'Sign up',
  name: 'signupSubmit',
});

const form = new SignupForm({
  ...inputMap,
  submitButton,
});

const formElements = {
  form,
  inputMap,
  buttonMap: { submitButton },
};

const signupForm = new FormController<TFieldUnion>(formElements);

signupForm.onInputBlur((formData, setHints) => {
  const fieldHits = verifyService.verify<TFieldUnion>(formData);
  setHints(fieldHits);
});

signupForm.onStartSubmit((next, formData, setHints) => {
  const fieldHits = verifyService.verify(formData);
  if (isSomeValues(fieldHits)) {
    setHints(fieldHits);
  } else {
    next();
  }
});

signupForm.onRequest((reqState) => {
  const { fetching } = reqState;
  submitButton.setProps({ load: fetching, disabled: fetching });
});

signupForm.request((formData, update) => {
  console.log(formData);
  update({ error: '', fetching: true, success: false });
  API.signup(formData)
    .then((data) => {
      console.log(data);
      update({ error: '', fetching: false, success: true });
    })
    .catch((error) => {
      console.log(error);
      update({ error: '[debugg error]', fetching: false, success: false });
    });
});

export { form };
