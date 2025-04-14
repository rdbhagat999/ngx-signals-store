import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';

@Component({
    selector: 'app-posts',
    imports: [PostListComponent],
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {}
