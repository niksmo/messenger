export interface TViewerState {
  viewer: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
    auth: boolean;
    fetching: boolean;
  };
}

export const viewerState: TViewerState = {
  viewer: {
    auth: false,
    fetching: true,
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    login: '',
    avatar: '',
    email: '',
  },
};
