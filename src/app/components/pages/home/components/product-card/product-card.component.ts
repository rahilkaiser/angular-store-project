import {Component, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

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
}
