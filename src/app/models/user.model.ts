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

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
