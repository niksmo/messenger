import signinPage from '../pages/signin';
import './styles/index.css';

const stub = document.createElement('div');

stub.append(signinPage.getFormContent());

export default stub;
