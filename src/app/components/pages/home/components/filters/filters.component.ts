import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {NgForOf, NgIf} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {StoreService} from "../../../../../services/store.service";
import {Subscription} from "rxjs";

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
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories:string[] = []
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

  }


  onShowCategory(category: string) {
    this.showCategory.emit(category)
  }


}
