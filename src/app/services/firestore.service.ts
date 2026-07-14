import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { StockHistory } from '../models/stock-history';
import { Movement } from '../models/movement';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore = inject(Firestore);

  // ==========================
  // Product Methods
  // ==========================

  // Add Product
  addProduct(product: Product) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
  }

  // Get All Products
  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');

    return collectionData(productsRef, {
      idField: 'id'
    }) as Observable<Product[]>;
  }

  // Update Product
  updateProduct(product: Product) {
    const productRef = doc(this.firestore, `products/${product.id}`);

    return updateDoc(productRef, {
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      reorderLevel: product.reorderLevel
    });
  }

  // Delete Product
  deleteProduct(id: string) {
    const productRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(productRef);
  }

  // ==========================
  // Stock History Methods
  // ==========================

  // Add History
  addHistory(history: StockHistory) {
    const historyRef = collection(this.firestore, 'stock-history');
    return addDoc(historyRef, history);
  }

  // Get All History
  getHistory(): Observable<StockHistory[]> {
    const historyRef = collection(this.firestore, 'stock-history');

    return collectionData(historyRef, {
      idField: 'id'
    }) as Observable<StockHistory[]>;
  }

  // ==========================
  // Movement Methods
  // ==========================

  // Add Movement
  addMovement(movement: Movement) {
    const movementRef = collection(this.firestore, 'movements');
    return addDoc(movementRef, movement);
  }

  // Get All Movements
  getMovements(): Observable<Movement[]> {
    const movementRef = collection(this.firestore, 'movements');

    return collectionData(movementRef, {
      idField: 'id'
    }) as Observable<Movement[]>;
  }

}