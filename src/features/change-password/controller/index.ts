import { verifyService } from 'shared/components/verifier';
import { FormController } from 'shared/components/form';
import { isSomeValues } from 'shared/helpers';
import { ButtonFilled } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { ChangePasswordForm } from '../ui';

type TFieldUnion = 'current_password' | 'new_password' | 'confirm';

const inputMap = {
  current_password: new Input({
    id: 'current_password',
    name: 'current_password',
    placeholder: 'Current password',
    type: 'password',
    error: false,
    value: '',
  }),
  new_password: new Input({
    id: 'new_password',
    name: 'new_password',
    placeholder: 'New password',
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
  label: 'Change',
  name: 'changeButton',
});

const form = new ChangePasswordForm({
  ...inputMap,
  submitButton,
});

const formElements = {
  form,
  inputMap,
  buttonMap: { submitButton },
};

const changePasswordForm = new FormController<TFieldUnion>(formElements);

changePasswordForm.onInputBlur((formData, setHints) => {
  const fieldHits = verifyService.verify<TFieldUnion>(formData);
  setHints(fieldHits);
});

changePasswordForm.onStartSubmit((next, formData, setHints) => {
  const fieldHits = verifyService.verify(formData);
  if (isSomeValues(fieldHits)) {
    setHints(fieldHits);
  } else {
    next();
  }
});

changePasswordForm.onRequest((reqState) => {
  const { fetching } = reqState;
  submitButton.setProps({ load: fetching, disabled: fetching });
});

changePasswordForm.request((formData, update) => {
  console.log(formData);
  update({ error: '', fetching: true, success: false });
});

export { form };
