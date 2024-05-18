import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIcon,
  ],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css'
})
export class ProductsHeaderComponent {

  @Output() LayoutViewChange = new EventEmitter<number>();
  @Output() setSortDesc = new EventEmitter<boolean>();
  @Output() setItemsShowCount = new EventEmitter<number>();

  sortDesc = true;
  itemsShowCount: number = 10;
  constructor() {
  }

  updateSortOrder(b: boolean) {
    this.sortDesc = b;
    this.setSortDesc.emit(this.sortDesc);
  }

  updateItems(count: number) {
    this.itemsShowCount = count;
    this.setItemsShowCount.emit(count);
  }

  updateViewLayout(layoutNumber: number) {
    this.LayoutViewChange.emit(layoutNumber);
  }
}
