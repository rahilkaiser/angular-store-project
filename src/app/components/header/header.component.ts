import {Component, Input} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";

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
export class HeaderComponent {
  @Input() get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = this._cart.items.map((item) => item.quantity).reduce(
      (prev, curr) => prev + curr, 0
    );
  }

  constructor(private cartService: CartService) {
  }

  private _cart: Cart = {items: []};
  itemsQuantity: number = 0;
  protected readonly menubar = menubar;

  getTotal(items: Array<CartItem>) {
    return this.cartService.getTotal(items);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
