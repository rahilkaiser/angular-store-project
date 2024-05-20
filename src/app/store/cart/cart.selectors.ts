import { createSelector } from '@ngrx/store';
import {AppState} from "../app.state";

export const selectCartState = (state: any) => state.cartState;

export const getCartItems = createSelector(
  selectCartState,
  (cart) => cart.items
);
