import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserState } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // BehaviorSubject: is a type of Observable that emits the last value to any observer as soon as it subscribes.
  private state$ = new BehaviorSubject<UserState>({
    loading: false,
    data: null,
    error: null
  });
  
  constructor(private authService: AuthService) {}

  getUserState(): Observable<UserState> {
    return this.state$.asObservable();
  }

  fetchUser(): void {
    this.state$.next({ loading: true, data: null, error: null });

    // Simulate API call
    setTimeout(() => {
      try {
        this.state$.next({ loading: false, data: {
          id: 0,
          name: "",
          email: "",
          avatar: ""
        }, error: null });
      } catch (error) {
        this.state$.next({ loading: false, data: null, error: 'Failed to load user data' });
      }
    }, 1000);
  }

  clearUser(): void {
    this.state$.next({ loading: false, data: null, error: null });
  }
}
