import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ProductCardComponent} from "./components/product-card/product-card.component";


const ROW_HEIGHT:{[id:number]:number} = {1: 400,3:335,4: 350}
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
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  colPerRow = 3;
  category: string|undefined;
  rowHeight: number = ROW_HEIGHT[this.colPerRow];

  onColumnsCountChange($event: number) {
    this.colPerRow = $event;
    this.rowHeight= ROW_HEIGHT[this.colPerRow];
  }

  onShowCategory(selectedCategory: string) {
    console.log(selectedCategory);
    this.category = selectedCategory;
  }
}
