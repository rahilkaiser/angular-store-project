import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {Product} from "../../../models/product.model";
import {CartService} from "../../../services/cart.service";
import {Subscription} from "rxjs";
import {StoreService} from "../../../services/store.service";
import {NgForOf} from "@angular/common";


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
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  colPerRow = 3;
  category: string | undefined;
  rowHeight: number = ROW_HEIGHT[this.colPerRow];
  products: Product[] = [];
  sortDesc = true;
  count: number = 10;
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) {
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

  onAddToCart(product: Product) {
    this.cartService.addToCart({
      productImg: product.image,
      id: product.id,
      quantity: 1,
      name: product.title,
      price: product.price,
    });
  }


  private getProducts() {
    const sortOrder = this.sortDesc ? "desc" : "asc";
    this.productsSubscription = this.storeService.getAllProducts(this.count.toString(), sortOrder, this.category).subscribe(
      (_products: Product[]) => {
        this.products = _products;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onItemShowCountChange($event: number) {
    this.count = $event;
    this.getProducts();
  }

  onSortDescChange($event: boolean) {
    this.sortDesc = $event;
    this.getProducts();
  }
}
