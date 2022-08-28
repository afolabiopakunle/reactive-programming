import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPost} from "./post.interface";
import {ICategory} from "./category";
import {map, mergeMap} from "rxjs/operators";
import {CategoryService} from "./category.service";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient, private categoryService: CategoryService) {}

  fetchPosts() {
    return this.http.get<{ [id: string]: IPost }>('https://lms-ng-6baf8-default-rtdb.europe-west1.firebasedatabase.app/posts.json',)
      .pipe(map(posts => {
        let postData: IPost[] = [];
        for (let id in posts) {
          postData.push({...posts[id], id})
        }
        return postData;
      }))
  }

  getPostsWithCategory$ = this.fetchPosts().pipe(
    mergeMap((posts) => {
      return this.categoryService.getCategories().pipe(
        map((categories) => {
          return posts.map(post => {
            return {
              ...post,
              categoryName: categories.find(category => category.id === post.categoryId)?.title
            }
          })
        }))
    }))

}
