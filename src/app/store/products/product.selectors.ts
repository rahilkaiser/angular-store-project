import { createSelector } from '@ngrx/store';
import {ProductState} from "./product.reducer";
import {Product} from "../../models/product.model";

export const selectProductState = (state: any): ProductState => state.productState;

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState): ProductState => ({
    products: state.products,
    status: state.status,
    error: state.error,
  })
);
