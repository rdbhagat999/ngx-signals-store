import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-products',
  imports: [ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly metaTagService = inject(MetaTagService);

  constructor() {
    this.metaTagService.updateTitle('Products');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the products page of the Angular application.'
    );
  }
}
