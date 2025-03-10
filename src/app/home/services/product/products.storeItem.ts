import { Injectable } from "@angular/core";
import { StoreItem } from "../../../shared/storeItem";
import { Product } from "../../types/products.type";
import { ProductsService } from "./products.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn : "root"
})

export class ProductStoreItem extends StoreItem<Product[]>{

    constructor(private productsService : ProductsService){
        super([]);
    }

    async loadProducts(query? :string){
        this.productsService.getProductsList(query).subscribe(products =>{
            this.setValue(products);
        })
    }

    get products$():Observable<Product[]>{
        return this.value$;
    }

    get products():Product[]{
        return this.value;
    }

}