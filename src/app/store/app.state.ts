import {ProductState} from "./products/product.reducer";
import {CartState} from "./cart/cart.reducer";

export interface AppState {
  productState: ProductState;
  cartState: CartState;
}
