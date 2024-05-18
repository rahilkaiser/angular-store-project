import {Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {CartComponent} from "./components/pages/cart/cart.component";

export const routes: Routes = [{
  path: 'home',
  component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  }
];
