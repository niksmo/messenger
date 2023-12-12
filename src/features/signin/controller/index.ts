import { EventBus } from '../../../shared/packages/event-bus';
import { verifier } from '../../../shared/services/verifier-service';
import { API } from '../../../shared/services/api-service';
import { Input } from '../../../shared/ui/input';
import { ButtonFilled } from '../../../shared/ui/button';
import { SigninForm, SigninMessage } from '..';

const eventBus = new EventBus();

const enum SigninEvent {
  INPUT = 'input',
  BLUR = 'blur',
  SUBMIT = 'submit',
  VERIFY = 'verify',
  REQUEST = 'request',
  RESPONSE = 'response',
}

type TFieldName = 'login' | 'password';

const fieldMap = {
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

const signinForm = new SigninForm({
  ...fieldMap,
  submitButton,
  onInput(e) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { value, name } = target;
      eventBus.emit(SigninEvent.INPUT, { name, value });
    }
  },
  onBlur() {
    eventBus.emit(SigninEvent.BLUR, getFormData());
  },
  onSubmit(e) {
    e.preventDefault();
    eventBus.emit(SigninEvent.SUBMIT, getFormData());
  },
});

const responseMsg = new SigninMessage({ visible: false });

function getFormData() {
  const fieldMapEntries = Object.entries(fieldMap);
  const dataEntries: [string, string][] = fieldMapEntries.map(
    ([field, inputBlock]) => [field, inputBlock.getValue()]
  );
  return Object.fromEntries(dataEntries);
}

function showSupport(verifyResult: Record<string, string>): boolean {
  let isShow = false;

  const entries = Object.entries(verifyResult);

  entries.forEach(([key, support]) => {
    if (support) {
      isShow = true;
      const field = key as keyof typeof fieldMap;
      fieldMap[field].setProps({ error: true, support });
    }
  });

  return isShow;
}

function onInput({ name, value }: { name: TFieldName; value: string }) {
  fieldMap[name].setProps({ value });
}

function onBlur(formValues: Record<string, string>) {
  verifier.verify(formValues, showSupport);
}

function onSubmit(formValues: Record<string, string>) {
  verifier.verify(formValues, result => {
    if (!showSupport(result)) {
      eventBus.emit(SigninEvent.REQUEST, formValues);
    }
  });
}

function onRequest(formValues: Record<string, string>) {
  responseMsg.setProps({ visible: false });
  submitButton.setProps({ load: true });

  API.post(formValues)
    .then(() => {})
    .catch(() => {
      responseMsg.setProps({ visible: true });
    })
    .finally(() => {
      submitButton.setProps({ load: false });
    });
}

eventBus.on(SigninEvent.INPUT, onInput);
eventBus.on(SigninEvent.BLUR, onBlur);
eventBus.on(SigninEvent.SUBMIT, onSubmit);
eventBus.on(SigninEvent.REQUEST, onRequest);

export { signinForm, responseMsg };
