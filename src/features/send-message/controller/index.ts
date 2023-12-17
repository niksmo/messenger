import { FormController } from 'shared/components/form';
import { MessageForm, MessageInput, MessageSender } from '../ui';
import { IconButton } from 'shared/ui/button';

const message = new MessageInput({ name: 'message' });

const submitButton = new IconButton({
  type: 'submit',
  id: 'send-msg',
  icon: 'paperplane',
  style: 'secondary',
});

const form = new MessageForm({ input: message, submitButton });

const formController = new FormController({
  form,
  inputMap: { message },
  buttonMap: { submitButton },
});

formController
  .onStartSubmit(next => {
    next();
  })
  .request(formData => {
    console.log(formData);
    const formEl = form.getContent() as HTMLFormElement;
    formEl.reset();
  });

const messageSender = new MessageSender({ form });

export { messageSender };
