import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../models/user.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})
export class AdminDialogComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() admin: Admin | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  adminForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['Viewer', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.isEdit = !!this.admin;
    if (this.admin) {
      this.adminForm.patchValue({
        name: this.admin.name,
        email: this.admin.email,
        role: this.admin.role
      });
    } else {
      this.adminForm.reset({ role: 'Viewer' });
    }
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const { name, email, role } = this.adminForm.value;

      if (this.isEdit && this.admin) {
        this.adminService.updateAdmin(this.admin.id, { name, email, role });
      } else {
        this.adminService.addAdmin({ name, email, role });
      }

      this.saved.emit();
      this.onClose();
    } else {
      this.adminForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
    this.adminForm.reset({ role: 'Viewer' });
  }

  getErrorMessage(field: string): string {
    const control = this.adminForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
