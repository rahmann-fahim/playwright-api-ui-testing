import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
 imports: [
  FormsModule,
  CommonModule,
  RouterLink,
  RouterLinkActive
],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  products = signal<any[]>([]);

  error = signal('');
  message = signal('');

  name = '';
  category = '';
  price: number | null = null;
  quantity: number | null = null;

  editingId: number | null = null;

  showDeleteModal = signal(false);
  productToDelete = signal<any | null>(null);


  constructor(
    private http: HttpClient
  ) {
    this.getProducts();
  }


  // =========================
  // GET PRODUCTS
  // =========================

  getProducts() {

    this.http.get<any[]>(
      'http://localhost:8081/api/products'
    ).subscribe({

      next: (response) => {

        this.products.set(response);

        this.error.set('');

      },

      error: (error) => {

        this.error.set(
          this.getErrorMessage(
            error,
            'Failed to load products'
          )
        );

      }

    });

  }


  // =========================
  // CREATE / UPDATE
  // =========================

  saveProduct() {

    this.error.set('');
    this.message.set('');

    const data = {
      name: this.name,
      category: this.category,
      price: this.price,
      quantity: this.quantity
    };


    // CREATE
    if (this.editingId === null) {

      this.http.post<any>(
        'http://localhost:8081/api/products',
        data
      ).subscribe({

        next: () => {

          this.clearForm();

          this.getProducts();

          this.message.set(
            'Product added successfully'
          );

        },

        error: (error) => {

          this.error.set(
            this.getErrorMessage(
              error,
              'Failed to add product'
            )
          );

        }

      });

      return;
    }


    // UPDATE
    this.http.put<any>(
      `http://localhost:8081/api/products/${this.editingId}`,
      data
    ).subscribe({

      next: () => {

        this.clearForm();

        this.getProducts();

        this.message.set(
          'Product updated successfully'
        );

      },

      error: (error) => {

        this.error.set(
          this.getErrorMessage(
            error,
            'Failed to update product'
          )
        );

      }

    });

  }


  // =========================
  // EDIT
  // =========================

  editProduct(product: any) {

    this.editingId = product.id;

    this.name = product.name;
    this.category = product.category;
    this.price = product.price;
    this.quantity = product.quantity;

    this.message.set('');
    this.error.set('');

  }


  // =========================
  // OPEN DELETE MODAL
  // =========================

  deleteProduct(product: any) {

    this.productToDelete.set(product);

    this.showDeleteModal.set(true);

    this.error.set('');

  }


  // =========================
  // CONFIRM DELETE
  // =========================

  confirmDelete() {

    const product = this.productToDelete();

    if (!product) {
      return;
    }

    const productId = product.id;

    this.http.delete(
      `http://localhost:8081/api/products/${productId}`,
      {
        responseType: 'text'
      }
    ).subscribe({

      next: () => {

        // Remove from UI immediately
        this.products.update(
          currentProducts =>
            currentProducts.filter(
              item => item.id !== productId
            )
        );

        // Close modal
        this.showDeleteModal.set(false);

        this.productToDelete.set(null);

        // Show success message
        this.message.set(
          'Product deleted successfully'
        );

        this.error.set('');

      },

      error: (error) => {

        this.showDeleteModal.set(false);

        this.productToDelete.set(null);

        this.error.set(
          this.getErrorMessage(
            error,
            'Failed to delete product'
          )
        );

      }

    });

  }


  // =========================
  // CLOSE MODAL
  // =========================

  closeDeleteModal() {

    this.showDeleteModal.set(false);

    this.productToDelete.set(null);

  }


  // =========================
  // CLEAR FORM
  // =========================

  clearForm() {

    this.name = '';
    this.category = '';
    this.price = null;
    this.quantity = null;
    this.editingId = null;

  }


  // =========================
  // ERROR HANDLER
  // =========================

  private getErrorMessage(
    error: any,
    defaultMessage: string
  ): string {

    if (
      typeof error?.error === 'string'
    ) {
      return error.error;
    }

    if (
      typeof error?.error?.message === 'string'
    ) {
      return error.error.message;
    }

    if (
      typeof error?.message === 'string'
    ) {
      return error.message;
    }

    return defaultMessage;

  }

}