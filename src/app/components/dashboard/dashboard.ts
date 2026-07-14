import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  constructor(private router: Router) {}

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  goToProductList() {
    this.router.navigate(['/product-list']);
  }

  goToStockHistory() {
    this.router.navigate(['/stock-history']);
  }

  logout() {
    this.router.navigate(['/']);
  }

}