import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../store/product.model';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItemComponent {
  item = input.required<Product>();
}
