import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {productReducer} from "./store/products/product.reducer";
import {ProductEffects} from "./store/products/product.effects";
import {cartReducer} from "./store/cart/cart.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withHashLocation()),
    provideStore({productState: productReducer, cartState: cartReducer}),
    importProvidersFrom(StoreDevtoolsModule.instrument({maxAge: 25})),
    provideEffects([ProductEffects]),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule)]
};
