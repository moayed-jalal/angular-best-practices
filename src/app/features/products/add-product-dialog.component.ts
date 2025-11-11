import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<void>();

  productForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const { name, description, price } = this.productForm.value;

      this.productService.addProduct({
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price)
      });

      this.loading = false;
      this.productForm.reset();
      this.productAdded.emit();
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  getErrorMessage(field: string): string {
    const control = this.productForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('min')) {
      return 'Price must be greater than 0';
    }
    return '';
  }
}
