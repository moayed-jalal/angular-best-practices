export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  loading: boolean;
  data: User | null;
  error: string | null;
}
