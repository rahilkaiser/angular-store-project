import {createAction, createReducer, on} from '@ngrx/store';
import {loadProducts, loadProductsFailure, loadProductsSuccess} from "./product.actions";
import {Product} from "../../models/product.model";
import {LoadingStatus} from "../../models/loadingstates.model";

export interface ProductState {
  products: Product[];
  error: string | null;
  status: LoadingStatus;
}

export const initialState: ProductState = {
  products: [],
  error: null,
  status: LoadingStatus.Pending
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state, {itemCount, sortOrder, category}) => {
      console.log(itemCount, sortOrder, category);

      return ({
        ...state,
        status: LoadingStatus.Loading,
      })

    }
  ),

  on(loadProductsSuccess, (state, {products}) => ({
    ...state,
    status: LoadingStatus.Success,
    products: products,
    error: null,
  })),

  on(loadProductsFailure, (state, {error}) => ({
    ...state,
    status: LoadingStatus.Error,
    error: error,
  })),
);


