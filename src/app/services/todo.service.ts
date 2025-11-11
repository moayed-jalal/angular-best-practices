import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos$ = new BehaviorSubject<Todo[]>([]);
  private storageKey = 'todos';

  constructor() {
    this.loadFromStorage();
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$.asObservable();
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const currentTodos = this.todos$.value;
    const newTodo: Todo = {
      ...todo,
      id: this.generateId()
    };
    const updatedTodos = [...currentTodos, newTodo];
    this.todos$.next(updatedTodos);
    this.saveToStorage(updatedTodos);
  }

  updateTodo(id: number, updatedTodo: Partial<Omit<Todo, 'id'>>): void {
    const currentTodos = this.todos$.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    this.todos$.next(updatedTodos);
    this.saveToStorage(updatedTodos);
  }

  deleteTodo(id: number): void {
    const currentTodos = this.todos$.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.todos$.next(updatedTodos);
    this.saveToStorage(updatedTodos);
  }

  getTodoStats(): Observable<{ pending: number; inProgress: number; completed: number }> {
    return this.todos$.pipe(
      map((todos: Todo[]) => {
        const pending = todos.filter((todo: Todo) => todo.status === 'pending').length;
        const inProgress = todos.filter((todo: Todo) => todo.status === 'in_progress').length;
        const completed = todos.filter((todo: Todo) => todo.status === 'completed').length;
        return { pending, inProgress, completed };
      })
    );
  }

  private generateId(): number {
    const currentTodos = this.todos$.value;
    const maxId = currentTodos.length > 0 ? Math.max(...currentTodos.map(todo => todo.id)) : 0;
    return maxId + 1;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const todos = JSON.parse(stored);
        this.todos$.next(todos);
      } catch (error) {
        console.error('Error loading todos from storage', error);
      }
    }
  }

  private saveToStorage(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
