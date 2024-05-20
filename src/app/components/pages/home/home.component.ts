import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {Product} from "../../../models/product.model";
import {CartService} from "../../../services/cart.service";
import {Observable, Subscription} from "rxjs";
import {StoreService} from "../../../services/store.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {provideStore, Store} from "@ngrx/store";
import {loadProducts} from "../../../store/products/product.actions";
import {selectAllProducts} from "../../../store/products/product.selectors";
import {productReducer, ProductState} from "../../../store/products/product.reducer";
import {LoadingStatus} from "../../../models/loadingstates.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BooleanInput} from "@angular/cdk/coercion";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {addCartItem} from "../../../store/cart/cart.actions";

const ROW_HEIGHT: { [id: number]: number } = {1: 400, 3: 335, 4: 350}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContent,
    ProductsHeaderComponent,
    MatDrawerContainer,
    FiltersComponent,
    MatGridList,
    MatGridTile,
    ProductCardComponent,
    NgForOf,
    AsyncPipe,
    NgIf,
    MatProgressSpinner,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer | undefined;

  colPerRow = 3;
  category: string | undefined;
  rowHeight: number = ROW_HEIGHT[this.colPerRow];
  sortDesc = true;
  count: number = 10;

  isDrawerOpen = false;

  productState$: Observable<ProductState>;

  constructor(private store: Store, private cartService: CartService, private storeService: StoreService) {
    this.productState$ = this.store.select(selectAllProducts);

  }

  ngOnInit(): void {
    this.getProducts();
  }

  onColumnsCountChange($event: number) {
    this.colPerRow = $event;
    this.rowHeight = ROW_HEIGHT[this.colPerRow];
  }

  onShowCategory(selectedCategory: string) {
    this.category = selectedCategory;
    this.getProducts();
  }

  private getProducts() {
    const sortOrder = this.sortDesc ? "desc" : "asc";

    this.store.dispatch(loadProducts({
        itemCount: this.count.toString(),
        sortOrder: sortOrder,
        category: this.category,
      }
    ));
  }

  onItemShowCountChange($event: number) {
    this.count = $event;
    this.getProducts();
  }

  onSortDescChange($event: boolean) {
    this.sortDesc = $event;
    this.getProducts();
  }

  protected readonly LoadingStatus = LoadingStatus;


  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  onContentClicked() {
    if (this.drawer && this.isDrawerOpen) {
      this.drawer.close();
      this.isDrawerOpen = false;
    }
  }
}
