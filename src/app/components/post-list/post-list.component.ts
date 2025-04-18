import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PostStore } from '../../store/posts.store';
import { PostListItemComponent } from './post-list-item/post-list-item.component';

@Component({
  selector: 'app-post-list',
  imports: [PostListItemComponent],
  providers: [],
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
