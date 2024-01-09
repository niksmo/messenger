import { verifyService } from 'shared/components/verifier';
import { FormController } from 'shared/components/form';
import { isSomeValues } from 'shared/helpers';
import { ButtonFilled } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { SigninForm, SigninMessage } from '../ui';

type TFieldUnion = 'login' | 'password';

const inputMap = {
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
};

const submitButton = new ButtonFilled({
  type: 'submit',
  label: 'Sign in',
  name: 'signinSubmit',
});

const form = new SigninForm({
  ...inputMap,
  submitButton,
});

const formElements = {
  form,
  inputMap,
  buttonMap: { submitButton },
};

const informMsg = new SigninMessage({ visible: false });

const signinForm = new FormController<TFieldUnion>(formElements);

signinForm.onInputBlur((formData, setHits) => {
  const fieldHits = verifyService.verify<TFieldUnion>(formData);
  setHits(fieldHits);
});

signinForm.onStartSubmit((next, formData, setHits) => {
  const fieldHits = verifyService.verify(formData);
  if (isSomeValues(fieldHits)) {
    setHits(fieldHits);
  } else {
    next();
  }
});

signinForm.onRequest((reqState) => {
  const { fetching } = reqState;
  submitButton.setProps({ load: fetching, disabled: fetching });
});

signinForm.onRequest((reqState) => {
  const { error } = reqState;
  informMsg.setProps({ visible: Boolean(error) });
});

signinForm.request((formData, update) => {
  console.log(formData);
  update({ error: '', fetching: true, success: false });
});

export { form, informMsg };
