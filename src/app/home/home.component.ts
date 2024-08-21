import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CatnavigationComponent } from "./components/catnavigation/catnavigation.component";
import { CategriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/product/products.storeItem';
import { SearchKeyword } from './types/searchKeyword.type';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CatnavigationComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(
    private categoriesStoreItem: CategriesStoreItem,
    private productsStoreItem : ProductStoreItem,
    private router : Router
  )
  {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      if((event as NavigationEnd).url === '/home'){
        router.navigate(["/home/products"]);
      }
    })
  }

  onSelectMainCategory(mainCategoryId:number):void{
    this.productsStoreItem.loadProducts('maincategoryid=' + mainCategoryId);
  }

  onSearchKeyword(searchKeyword : SearchKeyword):void{
    this.productsStoreItem.loadProducts('maincategoryid='+searchKeyword.categoryId+"&keyword="+searchKeyword.keyword);
  }

}
