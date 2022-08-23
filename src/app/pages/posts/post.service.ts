import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ICategory, IPost} from "./post.interface";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  fetchDocs() {
   return this.http.get<{[id: string]: IPost}>('https://lms-ng-6baf8-default-rtdb.europe-west1.firebasedatabase.app/posts.json', )
  }

  createPost(body: IPost) {
    return this.http.post('https://lms-ng-6baf8-default-rtdb.europe-west1.firebasedatabase.app/posts.json', body)
  }

  createCategories(category: ICategory) {
    return this.http.post('https://lms-ng-6baf8-default-rtdb.europe-west1.firebasedatabase.app/categories.json', category)
  }

}
