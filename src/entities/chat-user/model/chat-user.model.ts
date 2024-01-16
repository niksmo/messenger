export interface TChatUsersSate {
  chatUsers: [
    {
      id: number;
      first_name: string;
      second_name: string;
      display_name: string | null;
      login: string;
      avatar: string | null;
      role: string;
    },
  ];
}
