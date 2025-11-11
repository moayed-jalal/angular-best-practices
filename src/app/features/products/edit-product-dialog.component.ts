import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/user.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<void>();

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

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid && this.product) {
      this.loading = true;
      const { name, description, price } = this.productForm.value;

      this.productService.updateProduct(this.product.id, {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price)
      });

      this.loading = false;
      this.productUpdated.emit();
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
