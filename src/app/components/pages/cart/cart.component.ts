import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../../models/cart.model";
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {
  MatCell, MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    NgIf,
    MatButton,
    RouterLink,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatFooterRowDef,
    MatFooterRow,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatFooterCellDef,
    MatFooterCell,
    MatHeaderRowDef,
    CurrencyPipe,
    MatMiniFabButton,
    MatIconButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        productImg: 'https://via.placeholder.com/150',
        name: 'Sneakers',
        price: 150,
        quantity: 1,
        id: 1,
      },{
        productImg: 'https://via.placeholder.com/150',
        name: 'Sneakers',
        price: 150,
        quantity: 3,
        id: 1,
      },{
        productImg: 'https://via.placeholder.com/150',
        name: 'Sneakers',
        price: 150,
        quantity: 1,
        id: 1,
      },
    ]
  }
  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    'productImg',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }


  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).reduce(
      (prev, current) => prev + current, 0
    )
  }
}
