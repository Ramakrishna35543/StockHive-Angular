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

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  searchProduct() {

    this.filteredProducts = this.products.filter(product =>

      product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||

      product.sku.toLowerCase().includes(this.searchText.toLowerCase())

    );

  }

  editProduct(product: Product) {
    this.router.navigate(['/add-product'], {
      state: { product }
    });
  }

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

      .then(() => this.firestoreService.deleteProduct(id))

      .then(() => alert('Product Deleted Successfully!'))

      .catch(console.error);

    }

  }

}