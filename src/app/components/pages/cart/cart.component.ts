import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";
import {Store} from "@ngrx/store";
import {addCartItem, clearCart, removeCartItem, removeQuantity} from "../../../store/cart/cart.actions";
import {Observable, Subscription} from "rxjs";
import {getCartItems} from "../../../store/cart/cart.selectors";

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
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = {
    items: []
  }
  dataSource: Array<CartItem> = [];

  cartItems: Observable<CartItem[]> = this.store.select(getCartItems);

  displayedColumns: Array<string> = [
    'productImg',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  private cartItemsSubsription: Subscription | undefined;

  constructor(private store: Store, private cartService: CartService, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.cartItemsSubsription = this.cartItems.subscribe((items) => {
      this.dataSource = items;
      this.cart.items = items;
    });
  }

  ngOnDestroy(): void {
    if (this.cartItemsSubsription) {
      this.cartItemsSubsription.unsubscribe();
    }

  }

  getTotal(): number {
    return this.cartService.getTotal(this.dataSource);
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  removeCartItem(cartItem: CartItem) {
    this.store.dispatch(removeCartItem({cartItem: cartItem}));
  }

  removeQuantity(cartItem: CartItem) {
    this.store.dispatch(removeQuantity({cartItem: cartItem}));
  }

  addQuanity(cartItem: CartItem) {
    this.store.dispatch(addCartItem({cartItem: cartItem}));
  }

  onCheckout() {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51PIC62L2yfeZBzkaWBRd5umubSCKmiavVKq47u3mphUExH14ls7aQotJhgSJTYOloiW8NDw3XQtP3zcelr80INSk00SpCnFgNu');
      stripe?.redirectToCheckout({
        sessionId: res.id
      }).then((result) => {
        if (result.error) {
          console.log(result.error.message);
        }
      });
    }, (error) => {
      console.error('Error creating checkout session:', error);
    });
  }
}
