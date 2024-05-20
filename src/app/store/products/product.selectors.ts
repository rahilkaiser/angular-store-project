import { createSelector } from '@ngrx/store';
import {ProductState} from "./product.reducer";

export const selectProductState = (state: any): ProductState => state.productState;

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState): ProductState => ({
    products: state.products,
    status: state.status,
    error: state.error,
  })
);
