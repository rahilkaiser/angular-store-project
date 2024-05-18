import {Component, EventEmitter, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {NgForOf, NgIf} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatExpansionPanel,
    NgIf,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatSelectionList,
    MatListOption,
    NgForOf
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  categories = ['shoes', 'shirts', 'hoodies']

  onShowCategory(category:string) {
    console.log("mfkmf",category)
    this.showCategory.emit(category)
  }
}
