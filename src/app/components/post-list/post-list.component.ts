import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PostStore } from '../../store/posts.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [JsonPipe],
  providers: [PostStore],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  readonly postStore = inject(PostStore);

  constructor() {
    const query = this.postStore.filter.query;
    // 👇 Re-fetch posts whenever the value of query signal changes.
    this.postStore.loadByQuery(query);
  }

  ngOnInit(): void {}
}
