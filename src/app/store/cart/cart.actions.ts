import {createAction, props} from '@ngrx/store';
import {CartItem} from "../../models/cart.model";

// Action to clear all items from the cart
export const clearCart = createAction(
  '[Cart] Clear Cart'
);

// Action to remove an item from the cart
export const removeCartItem = createAction(
  '[Cart] Remove Cart Item',
  props<{ cartItem: CartItem }>()
);

// Action to add an item to the cart
export const addCartItem = createAction(
  '[Cart] Add Cart Item',
  props<{ cartItem: CartItem }>()
);

// Action to increase the quantity of an item in the cart
export const addQuantity = createAction(
  '[Cart] Add Quantity',
  props<{ cartItem: CartItem }>()
);

// Action to decrease the quantity of an item in the cart
export const removeQuantity = createAction(
  '[Cart] Remove Quantity',
  props<{ cartItem: CartItem }>()
);
