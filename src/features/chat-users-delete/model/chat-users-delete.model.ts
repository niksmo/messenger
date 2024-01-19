import type { TUser } from 'entites/chat-user/model/chat-user.model';

export interface TDeleteUsersState {
  deleteUsers: {
    users: TUser[];
    select: Array<TUser['id']>;
    load: boolean;
  };
}
