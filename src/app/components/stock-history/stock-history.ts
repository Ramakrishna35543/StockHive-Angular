import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirestoreService } from '../../services/firestore.service';
import { StockHistory } from '../../models/stock-history';

@Component({
  selector: 'app-stock-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-history.html',
  styleUrls: ['./stock-history.css']
})
export class StockHistoryComponent implements OnInit {

  history: StockHistory[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.getHistory().subscribe(data => {
      this.history = data;
    });
  }

}