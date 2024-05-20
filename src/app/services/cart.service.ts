import {Injectable} from '@angular/core';
import {Cart, CartItem} from "../models/cart.model";
import {CartState} from "../store/cart/cart.reducer";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store: Store<CartState>) {
  }

  /** Gets the Total Quantity of the Cart
   *
   * @param items
   */
  getTotal(items: Array<CartItem>) {
    return items.map((item) => item.price * item.quantity).reduce(
      (prev, current) => prev + current, 0
    )
  }
}
