import type { TUser } from 'entites/chat-user/model/chat-user.model';

export interface TDeleteUsersState {
  deleteUsers: {
    currentUsers: TUser[];
    select: Array<TUser['id']>;
    load: boolean;
  };
}
