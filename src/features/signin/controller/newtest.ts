import { SigninForm, SigninMessage } from '..';
import { FormController } from '../../../shared/components/awesome-form';
import {
  EVENT,
  getFormData,
} from '../../../shared/components/awesome-form/lib';
import { API } from '../../../shared/services/api-service';
import { TSigninFormData } from '../../../shared/services/api-service/model';
import { verifyService } from '../../../shared/services/verify-service';
import { ButtonFilled } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

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

class SigninFormController extends FormController {
  protected request(): void {
    this._requestState.fetching = true;
    this._requestState.error = '';
    this._requestState.success = false;
    API.signin(getFormData(this._elements) as TSigninFormData)
      .then(data => {
        console.log('signin-then', data);
        this._requestState.success = true;
      })
      .catch(data => {
        console.log('signin-catch', data);
        this._requestState.error = 'some error';
      })
      .finally(() => {
        this._requestState.fetching = false;
      });
  }
}

const signinForm = new SigninFormController({
  form,
  inputMap,
  button: { submitButton },
});

const responseMsg = new SigninMessage({ visible: false });

signinForm.on(EVENT.inputBlur, (a, b, c, d) => {
  const res = verifyService.verify(a as Record<string, string>);
  return res;
});

signinForm.on(EVENT.submitStart, (a, b, c, d) => {
  const res = verifyService.verify(a as Record<string, string>);
  return res;
});

signinForm.on(EVENT.request, (a, b, c, d) => {
  const probState = a as object;
  if ('fetching' in probState && typeof probState.fetching === 'boolean') {
    const { fetching } = probState;
    submitButton.setProps({ load: fetching, disabled: fetching });
  }
});

signinForm.on(EVENT.request, a => {
  const probState = a as object;
  if ('error' in probState && typeof probState.error === 'string') {
    const { error } = probState;
    responseMsg.setProps({ visible: Boolean(error) });
  }
});

export { form, responseMsg };
