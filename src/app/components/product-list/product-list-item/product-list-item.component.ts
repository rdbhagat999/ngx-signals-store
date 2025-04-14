import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../store/product.model';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list-item',
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItemComponent {
  item = input.required<Product>();
}
