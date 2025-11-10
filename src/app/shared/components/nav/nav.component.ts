import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-blue-500 text-white p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Angular Best Practices App</h2>
        <nav class="space-x-4">
          <a routerLink="/dashboard" class="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</a>
          <a routerLink="/profile" class="hover:bg-blue-700 px-3 py-2 rounded">Profile</a>
        </nav>
      </div>
    </nav>
  `
})

export class NavComponent {
}