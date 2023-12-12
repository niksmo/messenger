import './styles/index.css';
import { signinForm } from '../pages/signin';

const stub = document.createElement('div');

stub.append(signinForm.getContent());
signinForm.didMount();

export default stub;
