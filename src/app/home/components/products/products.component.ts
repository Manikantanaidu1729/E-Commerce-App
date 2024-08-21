import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RatingsComponent } from "../../../shared/components/ratings/ratings.component";
import { ProductStoreItem } from '../../services/product/products.storeItem';
import { RouterModule } from '@angular/router';
import { Product } from '../../types/products.type';
import { CartStoreItem } from '../../services/cart/cart.storeitem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RatingsComponent,RouterModule, FontAwesomeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  faShoppingCart = faShoppingCart;

  constructor(
    public productsStore : ProductStoreItem,
    private cart: CartStoreItem 
  ){}

  addToCart(product : Product){
    this.cart.addProduct(product);
  }
}
