import { FormController } from 'shared/components/form';
import { MessageForm, MessageInput, MessageSender } from '../ui';
import { IconButton } from 'shared/ui/button';
import { DropdownMenu, MenuItem } from 'shared/ui/dropdown';
import { Overlay } from 'shared/ui/overlay';

const message = new MessageInput({ name: 'message' });

const menuItemMedia = new MenuItem({
  label: 'Photo Or Video',
  icon: 'media',
  style: 'primary',
});
const menuItemFile = new MenuItem({
  label: 'File',
  icon: 'file',
  style: 'primary',
});

const overlay = new Overlay();

const dropdown = new DropdownMenu({
  menuList: [menuItemMedia, menuItemFile],
  overlay,
  posX: 'left',
  posY: 'top',
});

const menu = new IconButton({
  type: 'button',
  style: 'primary',
  icon: 'paperclip',
  ariaLabel: 'Attach media',
  role: 'menu',
  children: dropdown,
});

menu.setProps({
  onClick() {
    dropdown.toggle();
    overlay.toggle();
  },
});

const submitButton = new IconButton({
  type: 'submit',
  id: 'send-msg',
  icon: 'paperplane',
  style: 'secondary',
  role: 'button',
  ariaLabel: 'Send message',
});

const form = new MessageForm({ input: message, submitButton });

const formController = new FormController<'message'>({
  form,
  inputMap: { message },
  buttonMap: { submitButton },
});

formController
  .onStartSubmit((next, formData) => {
    const { message } = formData;
    if (message !== '') {
      next();
    }
  })
  .request((formData) => {
    console.log(formData);
    const formEl = form.getContent() as HTMLFormElement;
    formEl.reset();
  });

const messageSender = new MessageSender({ form, menu });

export { messageSender };
