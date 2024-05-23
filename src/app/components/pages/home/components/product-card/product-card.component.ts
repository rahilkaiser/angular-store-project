import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Product} from "../../../../../models/product.model";
import {Store} from "@ngrx/store";
import {Cart} from "../../../../../models/cart.model";
import {addCartItem} from "../../../../../store/cart/cart.actions";

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
  @Input() product: Product | undefined;
  showModal: boolean = false;
  modalImage: string = '';

  constructor(private store: Store<Cart>) {
  }

  onAddToCart() {
    if (this.product) {
      this.store.dispatch(addCartItem({
        cartItem: {
          productImg: this.product.image,
          id: this.product.id,
          quantity: 1,
          name: this.product.title,
          price: this.product.price,
        }
      }));
    }
  }

  openImageModal(image: string) {
    this.modalImage = image;
    this.showModal = true;
  }

  closeImageModal() {
    this.showModal = false;
    this.modalImage = '';
  }
}
