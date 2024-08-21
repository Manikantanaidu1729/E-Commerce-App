import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Category } from '../../types/category.type';
import { CommonModule } from '@angular/common';
import { CategriesStoreItem } from '../../services/category/categories.storeItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent implements OnDestroy{

  @Output() subCategoryClicked : EventEmitter<number> = new EventEmitter<number>

  categories : Category[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(categoryStore : CategriesStoreItem){
    this.subscriptions.add(
      categoryStore.categories$.subscribe((Categories) => {
        this.categories = Categories;
      }
    ))
  }

  getCategories(categoryId?:number):Category[]{
    return this.categories.filter(
      category => categoryId ? category.parent_category_id === categoryId : category.parent_category_id === null);
  }

  onSubCategoryClick(subCategory:Category):void{
    this.subCategoryClicked.emit(subCategory.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
