import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategriesStoreItem } from '../../services/category/categories.storeItem';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Category } from '../../types/category.type';
import { filter } from 'rxjs';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})

export class CatnavigationComponent {

  @Output() mainCategoryClicked: EventEmitter<number> = new EventEmitter<number>;

  displayOptions : boolean = true;

  constructor(public categoryStore: CategriesStoreItem, private router: Router){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true: false;
    })
  }

  onMainCategoryClick(mainCategory:Category):void{
    this.mainCategoryClicked.emit(mainCategory.id);
  }

  refresh(){}
}
