import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/user.model';
import { ProductService } from '../../services/product.service';
import { AddProductDialogComponent } from './add-product-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AddProductDialogComponent, EditProductDialogComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  showAddDialog = false;
  showEditDialog = false;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {}

  openAddDialog(): void {
    this.showAddDialog = true;
  }

  closeAddDialog(): void {
    this.showAddDialog = false;
  }

  onProductAdded(): void {
    this.closeAddDialog();
  }

  openEditDialog(product: Product): void {
    this.selectedProduct = product;
    this.showEditDialog = true;
  }

  closeEditDialog(): void {
    this.showEditDialog = false;
    this.selectedProduct = null;
  }

  onProductUpdated(): void {
    this.closeEditDialog();
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }
}
