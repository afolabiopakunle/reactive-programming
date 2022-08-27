import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {map} from "rxjs/operators";
import {IPost} from "./post.interface";
import {Subscription} from "rxjs";
import {CategoryService} from "./category.service";
import {ICategory} from "./category";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  // body: IPost = {
  //   categoryId: '-NAALehn-1zRHQP2RkOF',
  //   title: 'Transformers',
  //   description: 'Robotic objects rising everywhere'
  // }

  postObserver!: Subscription;

  posts!: IPost[];

  constructor(private postService: PostService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getPosts();
    // this.getCategories();
    // this.postCategory(this.category);
    // this.createPost(this.body)
  }

  ngOnDestroy(): void {
    this.postObserver.unsubscribe();
  }

  // getPosts() {
  //   this.postObserver = this.postService.fetchPosts()
  //     .subscribe(response => {
  //       this.posts = response;
  //     })
  //
  // }

  createPost(body: IPost) {
    this.postService.createPost(body)
      .subscribe(response => {
        console.log(response)
      })
  }


  postCategory(category: ICategory) {
    this.postService.createCategories(category)
      .subscribe(response => {
        console.log(response)
      })
  }

  getCategories() {
    this.categoryService.getCategories()
      .pipe(map(categories => {
        console.log('CATEGORIES', categories)
        const categoryData: ICategory[] = []
        for(let id in categories) {
          console.log('ID\'S', id)
          categoryData.push({...categories[id], id})
        }
        return categoryData;
      }))
      .subscribe(response => {
        console.log('FINAL' ,response)
      })
  }

  getPosts() {
    this.postService.getPostsWithCategory()
      .subscribe(response => {
        this.posts = response;
      })
  }

}
