import {Injectable} from '@angular/core';
import {CartItem} from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
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
