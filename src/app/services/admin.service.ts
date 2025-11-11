import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admins$ = new BehaviorSubject<Admin[]>([]);
  private storageKey = 'admins';

  constructor() {
    this.loadFromStorage();
  }

  getAdmins(): Observable<Admin[]> {
    return this.admins$.asObservable();
  }

  addAdmin(admin: Omit<Admin, 'id'>): void {
    const currentAdmins = this.admins$.value;
    const newAdmin: Admin = {
      ...admin,
      id: this.generateId()
    };
    const updatedAdmins = [...currentAdmins, newAdmin];
    this.admins$.next(updatedAdmins);
    this.saveToStorage(updatedAdmins);
  }

  updateAdmin(id: number, updatedAdmin: Omit<Admin, 'id'>): void {
    const currentAdmins = this.admins$.value;
    const updatedAdmins = currentAdmins.map(admin =>
      admin.id === id ? { ...admin, ...updatedAdmin } : admin
    );
    this.admins$.next(updatedAdmins);
    this.saveToStorage(updatedAdmins);
  }

  deleteAdmin(id: number): void {
    const currentAdmins = this.admins$.value;
    const updatedAdmins = currentAdmins.filter(admin => admin.id !== id);
    this.admins$.next(updatedAdmins);
    this.saveToStorage(updatedAdmins);
  }

  private generateId(): number {
    const currentAdmins = this.admins$.value;
    const maxId = currentAdmins.length > 0 ? Math.max(...currentAdmins.map(admin => admin.id)) : 0;
    return maxId + 1;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const admins = JSON.parse(stored);
        this.admins$.next(admins);
      } catch (error) {
        console.error('Error loading admins from storage', error);
        this.loadDefaultAdmins();
      }
    } else {
      this.loadDefaultAdmins();
    }
  }

  private loadDefaultAdmins(): void {
    const defaultAdmins: Admin[] = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Super Admin' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator' },
      { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Viewer' }
    ];
    this.admins$.next(defaultAdmins);
    this.saveToStorage(defaultAdmins);
  }

  private saveToStorage(admins: Admin[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(admins));
  }
}
