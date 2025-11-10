import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { UserState } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class='w-full px-2 lg:py-6 bg-black text-white'>
      <div class='max-w-7xl mx-auto w-full flex justify-between items-center'>
        <div class='flex items-center space-x-4'>
          <h1 class='text-2xl font-bold'>Angular</h1>
        </div>
        <div class='flex items-center space-x-4'>
          <!-- Loading State -->
          <div *ngIf="userState.loading" class='text-sm'>
            Loading...
          </div>
          <!-- Error State -->
          <div *ngIf="userState.error" class='text-red-400 text-sm'>
            {{ userState.error }}
          </div>
          <!-- Data State -->
          <div *ngIf="userState.data" class='flex items-center space-x-2'>
            <img *ngIf="userState.data.avatar" [src]="userState.data.avatar" alt="Avatar" class='w-8 h-8 rounded-full'>
            <div class='text-sm'>
              <div class='font-medium'>{{ userState.data.name }}</div>
              <div class='text-gray-300'>{{ userState.data.email }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})

export class HeaderComponent implements OnInit, OnDestroy {
  userState: UserState = { loading: false, data: null, error: null };
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUserState().subscribe((state: UserState) => {
        this.userState = state;
      })
    );
    this.userService.fetchUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
