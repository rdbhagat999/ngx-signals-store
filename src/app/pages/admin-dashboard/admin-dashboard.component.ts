import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  private readonly metaTagService = inject(MetaTagService);

  constructor() {
    this.metaTagService.updateTitle('Admin Dashboard');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the admin dashboard page of the Angular application.'
    );
  }
}
