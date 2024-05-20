import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {Store} from "@ngrx/store";
import {CartState} from "../../store/cart/cart.reducer";
import {clearCart} from "../../store/cart/cart.actions";
import {Observable, Subscription} from "rxjs";
import {getCartItems} from "../../store/cart/cart.selectors";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatIcon,
    MatBadge,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    CurrencyPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private cartItemsSubsription: Subscription | undefined;
  cartItemsObservable: Observable<CartItem[]> = this.store.select(getCartItems);
  cartItems: CartItem[] = [];
  itemsQuantity: number = 0;

  constructor(private cartService: CartService, private store: Store<CartState>) {
  }

  ngOnInit(): void {
    this.cartItemsSubsription = this.cartItemsObservable.subscribe((items) => {
      this.cartItems = items;
      this.itemsQuantity = items.map((item) => item.quantity).reduce(
        (prev, curr) => prev + curr, 0
      );
    });
  }

  ngOnDestroy(): void {
    if (this.cartItemsSubsription) {
      this.cartItemsSubsription.unsubscribe();
    }
  }

  getTotal() {
    return this.cartService.getTotal(this.cartItems);
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}
