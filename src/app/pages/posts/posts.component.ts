import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {IPost} from "./post.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  postObserver!: Subscription;

  posts!: IPost[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.postObserver.unsubscribe();
  }

  getPosts() {
    this.postService.getPostsWithCategory()
      .subscribe((response: IPost[]) => {
        this.posts = response;
      })
  }

}
