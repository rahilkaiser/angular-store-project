import {createAction, props} from '@ngrx/store';
import {Product} from "../../models/product.model";

export const loadProducts = createAction('[Product] Load Products',
  props<{ itemCount: string, sortOrder: string, category: string | undefined }>());

export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: Product[] }>());

export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: string }>());
