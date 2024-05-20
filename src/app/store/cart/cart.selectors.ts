import { createSelector } from '@ngrx/store';

export const selectCartState = (state: any) => state.cartState;

export const getCartItems = createSelector(
  selectCartState,
  (cart) => cart.items
);
