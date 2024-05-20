import {CartItem} from "../../models/cart.model";
import {createReducer, on} from "@ngrx/store";
import {addCartItem, clearCart, removeCartItem, removeQuantity} from "./cart.actions";

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(clearCart, (state) => {
      return ({
        ...state,
        items: []
      })
    }
  ),

  on(removeCartItem, (state, {cartItem}) => {
      const filteredItems = state.items.filter((item) => item.id !== cartItem.id
      );

      return ({
        ...state,
        items: filteredItems
      })
    }
  ),

  on(addCartItem, (state, {cartItem}) => {
      const items = [...state.items];

      const itemIndex = items.findIndex(item => item.id === cartItem.id);

      if (itemIndex !== -1) {
        const item = {...items[itemIndex]};
        item.quantity++;
        items[itemIndex] = item;
      } else {
        items.push({...cartItem});
      }
      return ({
        ...state,
        items: items
      })
    }
  ),

  on(removeQuantity, (state, {cartItem}) => {
      const updatedItems = state.items.map(item => {
        if (item.id === cartItem.id && item.quantity > 0) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      }).filter(item => item.quantity > 0);

      return ({
        ...state,
        items: updatedItems
      })
    }
  ),
);
