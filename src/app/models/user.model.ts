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

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}
