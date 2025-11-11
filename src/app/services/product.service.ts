import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);
  private storageKey = 'products';

  constructor() {
    this.loadFromStorage();
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const currentProducts = this.products$.value;
    const newProduct: Product = {
      ...product,
      id: this.generateId()
    };
    const updatedProducts = [...currentProducts, newProduct];
    this.products$.next(updatedProducts);
    this.saveToStorage(updatedProducts);
  }

  updateProduct(id: number, updatedProduct: Omit<Product, 'id'>): void {
    const currentProducts = this.products$.value;
    const updatedProducts = currentProducts.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    this.products$.next(updatedProducts);
    this.saveToStorage(updatedProducts);
  }

  deleteProduct(id: number): void {
    const currentProducts = this.products$.value;
    const updatedProducts = currentProducts.filter(p => p.id !== id);
    this.products$.next(updatedProducts);
    this.saveToStorage(updatedProducts);
  }

  private generateId(): number {
    const currentProducts = this.products$.value;
    const maxId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) : 0;
    return maxId + 1;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const products = JSON.parse(stored);
        this.products$.next(products);
      } catch (error) {
        console.error('Error loading products from storage', error);
      }
    }
  }

  private saveToStorage(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}
