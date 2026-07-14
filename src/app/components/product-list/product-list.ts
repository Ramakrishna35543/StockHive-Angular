import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchText = '';
  showLowStockOnly = false;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.firestoreService.getProducts().subscribe(data => {

      this.products = data;
      this.searchProduct();

    });

  }

  // ==========================
  // Search + Low Stock Filter
  // ==========================

  searchProduct() {

    const search = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter(product => {

      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search);

      const matchesLowStock =
        !this.showLowStockOnly ||
        product.quantity <= product.reorderLevel;

      return matchesSearch && matchesLowStock;

    });

  }

  // ==========================
  // Edit Product
  // ==========================

  editProduct(product: Product) {

    this.router.navigate(['/add-product'], {
      state: { product }
    });

  }

  // ==========================
  // Increase Stock
  // ==========================

  increaseStock(product: Product) {

    product.quantity++;

    this.firestoreService.updateProduct(product)

      .then(() => {

        return this.firestoreService.addHistory({

          productName: product.name,
          action: 'Stock Increased',
          quantity: product.quantity,
          date: new Date().toLocaleString()

        });

      })

      .then(() => {

        return this.firestoreService.addMovement({

          productId: product.id!,
          delta: 1,
          at: new Date().toISOString(),
          byUid: 'admin'

        });

      })

      .then(() => {

        this.searchProduct();

      })

      .catch(console.error);

  }

  // ==========================
  // Decrease Stock
  // ==========================

  decreaseStock(product: Product) {

    if (product.quantity <= 0) {

      alert('Stock cannot be less than zero.');
      return;

    }

    product.quantity--;

    this.firestoreService.updateProduct(product)

      .then(() => {

        return this.firestoreService.addHistory({

          productName: product.name,
          action: 'Stock Decreased',
          quantity: product.quantity,
          date: new Date().toLocaleString()

        });

      })

      .then(() => {

        return this.firestoreService.addMovement({

          productId: product.id!,
          delta: -1,
          at: new Date().toISOString(),
          byUid: 'admin'

        });

      })

      .then(() => {

        this.searchProduct();

      })

      .catch(console.error);

  }

  // ==========================
  // Delete Product
  // ==========================

  deleteProduct(id: string) {

    const product = this.products.find(p => p.id === id);

    if (!product) return;

    if (confirm('Delete this product?')) {

      this.firestoreService.addHistory({

        productName: product.name,
        action: 'Deleted',
        quantity: product.quantity,
        date: new Date().toLocaleString()

      })

      .then(() => {

        return this.firestoreService.addMovement({

          productId: product.id!,
          delta: -product.quantity,
          at: new Date().toISOString(),
          byUid: 'admin'

        });

      })

      .then(() => this.firestoreService.deleteProduct(id))

      .then(() => {

        alert('Product Deleted Successfully!');

      })

      .catch(console.error);

    }

  }

}