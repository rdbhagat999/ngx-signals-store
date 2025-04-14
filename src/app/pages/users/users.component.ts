import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-users',
  imports: [UserListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly metaTagService = inject(MetaTagService);

  constructor() {
    this.metaTagService.updateTitle('Users');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the users page of the Angular application.'
    );
  }
}
