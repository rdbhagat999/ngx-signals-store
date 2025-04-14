import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../../store/post.model';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-post-list-item',
    imports: [RouterModule],
    templateUrl: './post-list-item.component.html',
    styleUrl: './post-list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListItemComponent {
  item = input.required<Post>();
}
