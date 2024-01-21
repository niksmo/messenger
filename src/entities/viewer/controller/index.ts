import { Avatar } from 'shared/ui/avatar';
import { ProfileInfo } from '../ui';

const MOCK_DATA = {
  firstName: 'Dmitry',
  lastName: 'Antonovich',
  userName: 'dimosky',
};

const { firstName, lastName, userName } = MOCK_DATA;

const avatar = new Avatar({ name: MOCK_DATA.firstName });

const profileInfo = new ProfileInfo({ avatar, firstName, lastName, userName });

export { profileInfo };
