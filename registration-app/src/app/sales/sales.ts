import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
  FormsModule,
  CommonModule,
  RouterLink,
  RouterLinkActive
],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales {

  products = signal<any[]>([]);
  sales = signal<any[]>([]);

  error = signal('');
  message = signal('');

  selectedProductId: number | null = null;
  quantity: number | null = null;

  editingId: number | null = null;

  showDeleteModal = signal(false);
  saleToDelete = signal<any | null>(null);

  constructor(
    private http: HttpClient
  ) {
    this.getProducts();
    this.getSales();
  }

  getProducts() {

    this.http.get<any[]>(
      'http://localhost:8081/api/products'
    ).subscribe({

      next: (response) => {
        this.products.set(response);
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

  getSales() {

    this.http.get<any[]>(
      'http://localhost:8081/api/sales'
    ).subscribe({

      next: (response) => {
        this.sales.set(response);
      },

      error: (error) => {
        this.error.set(
          this.getErrorMessage(
            error,
            'Failed to load sales'
          )
        );
      }

    });
  }

  saveSale() {

    this.error.set('');
    this.message.set('');

    if (
      this.selectedProductId === null ||
      this.quantity === null ||
      this.quantity <= 0
    ) {

      this.error.set(
        'Please select a product and enter a valid quantity'
      );

      return;
    }

    const data = {
      productId: this.selectedProductId,
      quantity: this.quantity
    };

    if (this.editingId === null) {

      this.http.post<any>(
        'http://localhost:8081/api/sales',
        data
      ).subscribe({

        next: () => {

          this.clearForm();

          this.getProducts();
          this.getSales();

          this.message.set(
            'Sale created successfully'
          );
        },

        error: (error) => {

          this.error.set(
            this.getErrorMessage(
              error,
              'Failed to create sale'
            )
          );
        }

      });

      return;
    }

    this.http.put<any>(
      `http://localhost:8081/api/sales/${this.editingId}`,
      data
    ).subscribe({

      next: () => {

        this.clearForm();

        this.getProducts();
        this.getSales();

        this.message.set(
          'Sale updated successfully'
        );
      },

      error: (error) => {

        this.error.set(
          this.getErrorMessage(
            error,
            'Failed to update sale'
          )
        );
      }

    });
  }

  editSale(sale: any) {

    this.editingId = sale.id;

    this.selectedProductId =
      sale.product?.id ?? null;

    this.quantity =
      sale.quantity;

    this.message.set('');
    this.error.set('');
  }

  deleteSale(sale: any) {

    this.saleToDelete.set(sale);

    this.showDeleteModal.set(true);

    this.error.set('');
  }

  confirmDelete() {

    const sale = this.saleToDelete();

    if (!sale) {
      return;
    }

    const saleId = sale.id;

    this.http.delete(
      `http://localhost:8081/api/sales/${saleId}`,
      {
        responseType: 'text'
      }
    ).subscribe({

      next: () => {

        this.sales.update(
          currentSales =>
            currentSales.filter(
              item => item.id !== saleId
            )
        );

        this.showDeleteModal.set(false);
        this.saleToDelete.set(null);

        this.getProducts();

        this.message.set(
          'Sale deleted successfully'
        );

        this.error.set('');
      },

      error: (error) => {

        this.showDeleteModal.set(false);
        this.saleToDelete.set(null);

        this.error.set(
          this.getErrorMessage(
            error,
            'Failed to delete sale'
          )
        );
      }

    });
  }

  closeDeleteModal() {

    this.showDeleteModal.set(false);

    this.saleToDelete.set(null);
  }

  clearForm() {

    this.selectedProductId = null;

    this.quantity = null;

    this.editingId = null;
  }

  getTotalSales(): number {

    return this.sales().reduce(
      (total, sale) =>
        total + Number(sale.totalPrice || 0),
      0
    );
  }

  getTotalQuantity(): number {

    return this.sales().reduce(
      (total, sale) =>
        total + Number(sale.quantity || 0),
      0
    );
  }

  getProductName(sale: any): string {

    return sale.product?.name || 'Unknown Product';
  }

  private getErrorMessage(
    error: any,
    defaultMessage: string
  ): string {

    if (typeof error?.error === 'string') {
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