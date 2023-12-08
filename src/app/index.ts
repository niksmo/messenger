import { uuid } from '../shared/packages/uuid';
import Input from '../shared/ui/input';
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

export default stub;
