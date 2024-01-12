export interface IViewerState {
  viewer: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: null | string;
    phone: string;
    login: string;
    avatar: null | string;
    email: string;
    auth?: boolean;
  };
}
