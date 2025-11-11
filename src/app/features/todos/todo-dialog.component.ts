import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../models/user.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() todo: Todo | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  todoForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.isEdit = !!this.todo;
    if (this.todo) {
      this.todoForm.patchValue({
        title: this.todo.title,
        description: this.todo.description,
        status: this.todo.status
      });
    } else {
      this.todoForm.reset({ status: 'pending' });
    }
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const { title, description, status } = this.todoForm.value;

      if (this.isEdit && this.todo) {
        this.todoService.updateTodo(this.todo.id, { title, description, status });
      } else {
        this.todoService.addTodo({ title, description, status });
      }

      this.saved.emit();
      this.onClose();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
    this.todoForm.reset({ status: 'pending' });
  }

  getErrorMessage(field: string): string {
    const control = this.todoForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
