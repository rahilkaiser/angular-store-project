import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cart, CartItem} from "../models/cart.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackBar: MatSnackBar) {
  }

  /** Adds an Item to the cart
   *
   * @param item
   */
  addToCart(item: CartItem) {
    const items = [...this.cart.value.items];

    const itemInCart = items.find(
      (_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }

    this.cart.next({items: items})
    this._snackBar.open(
      '1 item added to the cart',
      'OK',
      {duration: 3000});

    console.log(this.cart.value.items)
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

  /** Clears the whole cart
   *
   */
  clearCart() {
    this.cart.next({items: []});
    this._snackBar.open('cart is cleared', 'OK', {duration: 3000});
  }

  /** Removes Cartitem by id
   *
   * @param id
   */
  removeCartItem(id: number) {
    const filteredItems = this.cart.value.items.filter((item) => item.id !== id);
    this.cart.next({items: filteredItems});
    this._snackBar.open('cart item removed', 'OK', {duration: 3000});

  }

  /** Reduces the Quantity of an item or removes it if its 0
   *
   * @param element
   */
  removeCartItemQuantity(element: CartItem) {
    let itemMarkedForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((item) => {
      if (item.id === element.id) {
        item.quantity--;
        if (item.quantity === 0) {
          itemMarkedForRemoval = item;
        }
      }
      return item;
    });

    if (itemMarkedForRemoval) {
      const newItems = filteredItems.filter(
        (item) => item.id !== itemMarkedForRemoval?.id);
      this.cart.next({items: newItems});
      this._snackBar.open('cart item removed', 'OK', {duration: 3000});
      return;
    }

    this.cart.next({items: filteredItems});
  }
}
