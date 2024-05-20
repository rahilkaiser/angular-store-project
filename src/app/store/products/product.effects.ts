import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { StoreService } from "../../services/store.service";
import { Injectable } from "@angular/core";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./product.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private storeService: StoreService) {
  }

  loadProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadProducts),
      switchMap((action) => {
        console.log('loadProducts$ effect triggered', action);
        return from(this.storeService.getAllProducts(action.itemCount, action.sortOrder, action.category)).pipe(
          map((products) => loadProductsSuccess({ products: products })),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      })
    )
  );
}
