import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-posts',
  imports: [PostListComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  private readonly metaTagService = inject(MetaTagService);

  constructor() {
    this.metaTagService.updateTitle('Posts');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the posts page of the Angular application.'
    );
  }
}
