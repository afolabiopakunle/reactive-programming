import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {map} from "rxjs/operators";
import {ICategory, IPost} from "./post.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  body: IPost = {
    categoryId: '-NAALehn-1zRHQP2RkOF',
    title: 'Transformers',
    description: 'Robotic objects rising everywhere'
  }

  postObserver!: Subscription;

  posts!: IPost[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
    // this.postCategory(this.category);
    // this.createPost(this.body)
  }

  ngOnDestroy(): void {
    this.postObserver.unsubscribe();
  }

  getPosts() {
    this.postObserver = this.postService.fetchDocs()
      .pipe(map(posts => {
        let postData: IPost[] = [];
        for(let id in posts) {
          postData.push({...posts[id], id})
        }
        return postData;
      }))
      .subscribe(postData => {
        this.posts = postData;
        console.log(this.posts)
      })
  }

  createPost(body: IPost) {
    this.postService.createPost(body)
      .subscribe(response => {
        console.log(response)
      })
  }

category: ICategory = {
    title: 'Action'
}

  postCategory(category: ICategory) {
    this.postService.createCategories(category)
      .subscribe(response => {
        console.log(response)
      })
  }
}
