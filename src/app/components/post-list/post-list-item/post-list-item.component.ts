import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../../store/post.model';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListItemComponent {
  item = input.required<Post>();
}
