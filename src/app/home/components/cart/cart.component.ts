import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeitem';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from "../../../shared/components/ratings/ratings.component";
import { CartItem, DeliveryAddress } from '../../types/cart.type';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users/user-service.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RatingsComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy{

  faTrash = faTrash;
  orderForm!: FormGroup;
  user : loggedInUser;
  subscriptions: Subscription = new Subscription();
  alertType : number = 0;
  alertMessage : string = "";
  disableCheckout : boolean = false;

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private fb: FormBuilder,
    private userservice : UserService,
    private orderService : OrderService
  ){
    this.user = {
      firstName : '',
      lastName :  '',
      address : '',
      city : '',
      state : '',
      pin : '',
      email : '',
    };

    this.subscriptions.add(this.userservice.loggedInUser$.subscribe((loggedUser)=>{
      if(loggedUser.firstName){
        this.user = loggedUser;
      }
    }))
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name : [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
      address : [`${this.user.address}`, Validators.required],
      city : [`${this.user.city}`, Validators.required],
      state : [`${this.user.state}`, Validators.required],
      pin : [`${this.user.pin}`, Validators.required],
    })
  }

  navigateToHome(){
    this.router.navigate(["home/products"]);
  }

  updateQuantity($event:any,cartItem:CartItem):void{
    if($event.target.innerText === "+"){
      this.cartStore.addProduct(cartItem.product);
    }
    else if($event.target.innerText === "-"){
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem:CartItem):void{
    this.cartStore.removeProduct(cartItem)
  }

  onSubmit(): void{
    if(this.userservice.isUserAuthenticated){
      const deliveryAddress : DeliveryAddress = {
        userName : this.orderForm.get('name')?.value,
        address : this.orderForm.get('address')?.value,
        city : this.orderForm.get('city')?.value,
        state : this.orderForm.get('state')?.value,
        pin : this.orderForm.get('pin')?.value,
      };
      this.subscriptions.add(
        this.orderService.saveOrder(deliveryAddress, this.user.email).subscribe({
          next : result => {
            this.cartStore.clearCart();
            this.alertType = 0;
            this.alertMessage = "Order registered successfully!";
            this.disableCheckout = true;
          },
          error : (error) =>{
            this.alertType = 2;
            if(error.error.message === "Authentication failed!"){
              this.alertMessage = "please log in to register your order.";
            }
            else{
              this.alertMessage = error.error.message;
            }
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}