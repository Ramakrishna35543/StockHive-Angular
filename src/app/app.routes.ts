import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { AddProduct } from './components/add-product/add-product';
import { ProductList } from './components/product-list/product-list';
import { StockHistoryComponent } from './components/stock-history/stock-history';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'add-product', component: AddProduct },
  { path: 'product-list', component: ProductList },
  { path: 'stock-history', component: StockHistoryComponent }
];