import { Injectable } from "@angular/core";
import { StoreItem } from "../../../shared/storeItem";
import { Category } from "../../types/category.type";
import { CategoryService } from "./category.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn : "root"
})

export class CategriesStoreItem extends StoreItem<Category[]>{

    constructor(private categoryService : CategoryService){
        super([]);
    }

    async loadCategories(){
        this.categoryService.getAllCategories().subscribe(categories =>{
            this.setValue(categories);
        })
    }

    get categories$():Observable<Category[]>{
        return this.value$;
    }

    get toplevelCategories$(): Observable<Category[]>{
        return this.value$.pipe(map((categories) =>
            categories.filter((category) => category.parent_category_id === null)
        ))
    }

}