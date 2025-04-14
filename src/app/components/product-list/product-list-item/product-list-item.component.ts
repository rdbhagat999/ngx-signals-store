import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../store/product.model';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-product-list-item',
    imports: [RouterModule],
    templateUrl: './product-list-item.component.html',
    styleUrl: './product-list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent {
  item = input.required<Product>();
}
