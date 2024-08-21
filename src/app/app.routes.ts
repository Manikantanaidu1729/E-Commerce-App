import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsGalleryComponent } from './home/components/products-gallery/products-gallery.component';
import { ProductdetailsComponent } from './home/components/productdetails/productdetails.component';
import { CartComponent } from './home/components/cart/cart.component';
import { UserSignupComponent } from './home/components/users/user-signup/user-signup.component';
import { UserLoginComponent } from './home/components/users/user-login/user-login.component';
import { PastordersComponent } from './home/components/pastorders/pastorders.component';
import { authGuard } from './home/services/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/home/products",
        pathMatch:"full"
    },
    {
        path:"home",
        // loadComponent: ()=> import("./home/home.component").then(m => m.HomeComponent),
        component: HomeComponent,
        children:[
            {
                path:"products",
                component:ProductsGalleryComponent
            },
            {
                path:"product/:id",
                component:ProductdetailsComponent
            },
            {
                path:"cart",
                component: CartComponent
            },
            {
                path:"signup",
                component: UserSignupComponent
            },
            {
                path:"login",
                component:UserLoginComponent
            },
            {
                path: "pastorders",
                component: PastordersComponent,
                canActivate : [authGuard]
            }
        ]
    },
    {
        path:"**",
        component:NotFoundComponent
    }
];