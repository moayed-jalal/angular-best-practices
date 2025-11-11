import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from '../../models/user.model';
import { TodoService } from '../../services/todo.service';
import { TodoDialogComponent } from './todo-dialog.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoDialogComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
  isDialogOpen = false;
  selectedTodo: Todo | null = null;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
  }

  ngOnInit(): void {}

  openAddDialog(): void {
    this.selectedTodo = null;
    this.isDialogOpen = true;
  }

  openEditDialog(todo: Todo): void {
    this.selectedTodo = todo;
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedTodo = null;
  }

  onTodoSaved(): void {
    this.closeDialog();
  }

  updateStatus(todo: Todo, newStatus: 'pending' | 'in_progress' | 'completed'): void {
    this.todoService.updateTodo(todo.id, { status: newStatus });
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id);
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
