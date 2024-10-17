import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {}
