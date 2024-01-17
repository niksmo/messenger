export interface TUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  role: string;
}

export type TChatUsersIndexed = Record<number, TUser>;

export interface TChatUsersSate {
  chatUsers: TChatUsersIndexed | null;
}
