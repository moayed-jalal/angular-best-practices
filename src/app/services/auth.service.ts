import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  constructor() {
    // Check if token exists in localStorage on initialization
    const token = localStorage.getItem('authToken');
    if (token) {
      // Simulate fetching user data based on token
      this.fetchUserData(token);
    }
  }

  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call - always succeed for demonstration
      setTimeout(() => {
        const token = 'fake-jwt-token-' + Date.now();
        const user: User = {
          id: 1,
          name: 'John Doe',
          email: email,
          avatar: 'https://via.placeholder.com/150'
        };

        localStorage.setItem('authToken', token);

        this.authState$.next({
          isAuthenticated: true,
          user,
          token
        });

        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState$.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  isAuthenticated(): boolean {
    return this.authState$.value.isAuthenticated;
  }

  private fetchUserData(token: string): void {
    // Simulate fetching user data
    setTimeout(() => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://via.placeholder.com/150'
      };
      this.authState$.next({
        isAuthenticated: true,
        user,
        token
      });
    }, 500);
  }
}
