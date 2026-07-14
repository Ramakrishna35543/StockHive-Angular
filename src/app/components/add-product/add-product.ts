import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FirestoreService } from '../../services/firestore.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProduct {

  isEdit = false;

  product: Product = {
    name: '',
    sku: '',
    quantity: 0,
    reorderLevel: 0
  };

  constructor(private firestoreService: FirestoreService) {

    const data = history.state.product;

    if (data) {
      this.product = data;
      this.isEdit = true;
    }
  }

  saveProduct() {

    if (this.isEdit) {

      this.firestoreService.updateProduct(this.product)
        .then(() => {

          const history = {
            productName: this.product.name,
            action: 'Updated',
            quantity: this.product.quantity,
            date: new Date().toLocaleString()
          };

          return this.firestoreService.addHistory(history);

        })
        .then(() => {
          alert('Product Updated Successfully!');
        })
        .catch(err => {
          console.error(err);
        });

    } else {

      this.firestoreService.addProduct(this.product)
        .then(() => {

          const history = {
            productName: this.product.name,
            action: 'Added',
            quantity: this.product.quantity,
            date: new Date().toLocaleString()
          };

          return this.firestoreService.addHistory(history);

        })
        .then(() => {

          alert('Product Added Successfully!');

          this.product = {
            name: '',
            sku: '',
            quantity: 0,
            reorderLevel: 0
          };

        })
        .catch(err => {
          console.error(err);
        });

    }
  }
}