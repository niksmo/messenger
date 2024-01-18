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
  };
}

export const viewer: {
  viewer: Pick<TViewerState['viewer'], 'auth' | 'login'>;
} = {
  viewer: {
    login: '',
    auth: false,
  },
};
