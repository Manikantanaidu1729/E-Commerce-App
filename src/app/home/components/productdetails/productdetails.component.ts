import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatingsComponent } from "../../../shared/components/ratings/ratings.component";
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/product/products.service';
import { CommonModule } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeitem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent,CommonModule,FontAwesomeModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit,OnDestroy{

  product!: Product;
  id!: number;

  subscriptions : Subscription = new Subscription();

  faShoppingCart = faShoppingCart;

  constructor(
    private activatedRoute : ActivatedRoute,
    private productsService : ProductsService,
    private cart : CartStoreItem){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => this.id = Number(paramMap.get('id')));
    this.subscriptions.add(
      this.productsService.getProduct(this.id).subscribe(product => this.product = product[0])
    );
  }

  addToCart(){
    this.cart.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
