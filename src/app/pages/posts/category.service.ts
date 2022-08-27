import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICategory} from "./category";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<{[id: string]: ICategory}>('https://lms-ng-6baf8-default-rtdb.europe-west1.firebasedatabase.app/category.json')
      .pipe(map(categories => {
        let categoriesData: ICategory[] = [];
        for(let id in categories) {
          categoriesData.push({...categories[id], id})
        }
        return categoriesData;
      }))
  }

}
