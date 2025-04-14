import {
  ChangeDetectionStrategy,
  Component,
  VERSION,
  inject,
} from '@angular/core';
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  angularFullVersion = VERSION.full;
  private readonly metaTagService = inject(MetaTagService);

  constructor() {
    this.metaTagService.updateTitle('Home');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the home page of the Angular application.'
    );
  }
}
