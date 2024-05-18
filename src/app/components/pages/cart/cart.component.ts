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
import {CartService} from "../../../services/cart.service";

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

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  /** Gets the Total of the Cart
   *
   * @param items
   */
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  /** Clears whole Cart
   *
   */
  clearCart() {
    this.cartService.clearCart()
  }

  /** Removes cartItem
   *
   * @param element
   */
  removeCartItem(element: CartItem) {
    this.cartService.removeCartItem(element.id);
  }

  /** Reduces the quantity of a cartitem
   *
   * @param element
   */
  removeQuantity(element: CartItem) {
    this.cartService.removeCartItemQuantity(element);
  }

  /** Adds the quantity of a CartItem
   *
   * @param element
   */
  addQuanity(element:CartItem) {
    this.cartService.addToCart(element)
  }
}
