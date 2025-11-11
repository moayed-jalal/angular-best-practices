import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { TodoService } from '../../services/todo.service';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="max-w-lg w-full bg-red-50 p-4 rounded">
          <p class="text-lg font-semibold">Total Products</p>
          <p class="text-2xl">{{ (productCount$ | async) || 0 }}</p>
        </div>

        <div class="max-w-lg w-full bg-green-50 p-4 rounded">
          <p class="text-lg font-semibold">Total Admins</p>
          <p class="text-2xl">{{ (adminCount$ | async) || 0 }}</p>
        </div>

        <div class="bg-blue-50 p-4 rounded">
          <h3 class="text-lg font-semibold">Pending Todos</h3>
          <p class="text-2xl">{{ (todoStats$ | async)?.pending || 0 }}</p>
        </div>
        <div class="bg-yellow-50 p-4 rounded">
          <h3 class="text-lg font-semibold">In Progress Todos</h3>
          <p class="text-2xl">{{ (todoStats$ | async)?.inProgress || 0 }}</p>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded mb-4">
        <h3 class="text-lg font-semibold">Completed Todos</h3>
        <p class="text-2xl">{{ (todoStats$ | async)?.completed || 0 }}</p>
      </div>

      <button (click)="logout()" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  productCount$: Observable<number>;
  adminCount$: Observable<number>;
  todoStats$: Observable<{ pending: number; inProgress: number; completed: number }>;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private todoService: TodoService,
    private adminService: AdminService,
    private route: Router
  ) {
    this.productCount$ = this.productService.getProducts().pipe(
      map(products => products.length)
    );
    this.adminCount$ = this.adminService.getAdmins().pipe(
      map(admins => admins.length)
    );
    this.todoStats$ = this.todoService.getTodoStats();
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login/']);
  }
}
