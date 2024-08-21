import { Component } from '@angular/core';
import { SidenavigationComponent } from '../sidenavigation/sidenavigation.component';
import { ProductsComponent } from '../products/products.component';
import { ProductStoreItem } from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products-gallery',
  standalone: true,
  imports: [SidenavigationComponent,ProductsComponent],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.scss'
})
export class ProductsGalleryComponent {

  constructor(private productsStoreItem: ProductStoreItem){}

  onSelectSubCategory(subCategoryId:number):void{
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
  
}
