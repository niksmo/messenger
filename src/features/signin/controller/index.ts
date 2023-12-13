import { EventBus } from '../../../shared/packages/event-bus';
import { verifier } from '../../../shared/services/verify-service';
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

type TFormData = { [key in TFieldName]: string };

interface IFieldData {
  name: TFieldName;
  value: string;
}

const fieldsMap = {
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
  ...fieldsMap,
  submitButton,
});

const responseMsg = new SigninMessage({ visible: false });

function getFormData() {
  const fieldsMapEntries = Object.entries(fieldsMap);
  const dataEntries: [string, string][] = fieldsMapEntries.map(
    ([field, inputBlock]) => [field, inputBlock.getValue()]
  );
  return Object.fromEntries(dataEntries) as TFormData;
}

function showSupport(verifyResult: Record<string, string>): boolean {
  let isShow = false;

  const entries = Object.entries(verifyResult);

  entries.forEach(([name, support]) => {
    const isError = Boolean(support);
    if (!isShow) {
      isShow = isError;
    }
    const field = name as keyof typeof fieldsMap;
    fieldsMap[field].setProps({ error: isError, support });
  });

  return isShow;
}

function onInputEvent({ name, value }: IFieldData) {
  fieldsMap[name].setProps({ value });
}

function onBlurEvent(formValues: Record<string, string>) {
  verifier.verify(formValues, showSupport);
}

function onSubmitEvent(formValues: TFormData) {
  verifier.verify(formValues, result => {
    if (!showSupport(result)) {
      eventBus.emit(SigninEvent.REQUEST, formValues);
    }
  });
}

function onRequestEvent(formValues: TFormData) {
  responseMsg.setProps({ visible: false });
  submitButton.setProps({ load: true, disabled: true });

  API.signin(formValues)
    .then(data => {
      console.log('signin-then', data);
    })
    .catch(data => {
      console.log('signin-catch', data);
      responseMsg.setProps({ visible: true });
    })
    .finally(() => {
      submitButton.setProps({ load: false, disabled: false });
    });
}

eventBus.on(SigninEvent.INPUT, onInputEvent);
eventBus.on(SigninEvent.BLUR, onBlurEvent);
eventBus.on(SigninEvent.SUBMIT, onSubmitEvent);
eventBus.on(SigninEvent.REQUEST, onRequestEvent);

function addBlurListenersOnFields() {
  const inputBlocks = Object.values(fieldsMap);

  const onBlur = () => {
    eventBus.emit(SigninEvent.BLUR, getFormData());
  };

  const setOnBlur = (inputBlock: Input) => {
    inputBlock.setProps({
      onBlur,
    });
  };

  inputBlocks.forEach(setOnBlur);
}

addBlurListenersOnFields();

signinForm.setProps({
  onInput(e) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { value, name } = target;
      eventBus.emit(SigninEvent.INPUT, { name, value });
    }
  },
  onSubmit(e) {
    e.preventDefault();
    eventBus.emit(SigninEvent.SUBMIT, getFormData());
  },
});

export { signinForm, responseMsg };
