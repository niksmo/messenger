import {
  SigninFormDirector,
  SigninForm,
  ResponseMessage,
} from '../../features/signin';

const signinForm = new SigninForm();
const responseMessage = new ResponseMessage();

const signinManager = new SigninFormDirector(signinForm, responseMessage);

signinManager.init();

export default signinForm;
