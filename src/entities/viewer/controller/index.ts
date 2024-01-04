import { Avatar } from 'shared/ui/avatar';
import { ProfileInfo } from '../ui';

const MOCK_DATA = {
  firstName: 'Dmitry',
  lastName: 'Antonovich',
  userName: 'dimosky',
  email: 'my-email@email.com',
  login: 'my-login',
  phone: '+79995437632',
};

const { firstName, lastName, userName, email, login, phone } = MOCK_DATA;

const avatar = new Avatar({ name: MOCK_DATA.firstName });

const profileInfo = new ProfileInfo({
  avatar,
  firstName,
  lastName,
  userName,
  email,
  login,
  phone,
});

export { profileInfo };
