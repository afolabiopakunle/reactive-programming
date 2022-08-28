import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {IPost} from "./post.interface";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<IPost[]> = this.postService.getPostsWithCategory$;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

}
