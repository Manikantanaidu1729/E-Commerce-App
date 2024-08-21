import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategriesStoreItem } from '../../services/category/categories.storeItem';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeitem';
import { UserService } from '../../services/users/user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy{

  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart= faShoppingCart;
  subscription : Subscription = new Subscription();

  @Output() searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  displaySearch: boolean = true;
  isUserAunthenticated : boolean = false;
  userName : string = '';

  constructor(
    public categoryStoreItem : CategriesStoreItem,
    private router: Router,
    public cartStore : CartStoreItem,
    public userService : UserService
  ){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.displaySearch = (event as NavigationEnd).url === '/home/products' ? true: false;
    });

    this.subscription.add(this.userService.isUserAuthenticated$.subscribe(result => {
      this.isUserAunthenticated = result;
    }))
    this.subscription.add(this.userService.loggedInUser$.subscribe(result => {
      this.userName = result.firstName;
    }))
  }

  onClickSearch(keyword:string,categoryId:string){
    this.searchClicked.emit({
      categoryId:parseInt(categoryId),
      keyword:keyword
    })
  }

  navigateToCart():void{
    this.router.navigate(['home/cart']);
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['home/products']);
  }

  pastOrders() {
    this.router.navigate(['home/pastorders']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
