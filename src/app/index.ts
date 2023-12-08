import { uuid } from '../shared/packages/uuid';
import { Button } from '../shared/ui/button';
import { Input } from '../shared/ui/input';
import './styles/index.css';

const stub = document.createElement('div');
stub.textContent = 'hello wolrd';

const input = new Input({
  id: uuid(),
  name: 'slim-shady',
  placeholder: 'slim-shady',
  type: 'text',
});

stub.append(input.getContent());

const button = new Button({
  label: 'Hey-Button',
  type: 'button',
  look: 'light',
});

stub.append(button.getContent());

export default stub;
