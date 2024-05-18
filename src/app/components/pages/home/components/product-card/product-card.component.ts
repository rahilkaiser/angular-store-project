import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Product} from "../../../../../models/product.model";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCard,
    CurrencyPipe,
    MatIcon,
    NgClass,
    NgIf
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() fullWidth: boolean = false;

  @Output() addToCart = new EventEmitter();

  // product: Product | undefined = {
  //   id: 1,
  //   title: 'Sneakers',
  //   price: 120,
  //   category: 'shoes',
  //   description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
  //   image_url: 'https://via.placeholder.com/150',
  // };
  @Input() product: Product |undefined;

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
