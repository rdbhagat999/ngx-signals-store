import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-moderator-dashboard',
  imports: [],
  templateUrl: './moderator-dashboard.component.html',
  styleUrl: './moderator-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeratorDashboardComponent {
  private readonly metaTagService = inject(MetaTagService);

  constructor() {
    this.metaTagService.updateTitle('Moderator Dashboard');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the moderator dashboard page of the Angular application.'
    );
  }
}
