import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProductStore } from '../../store/products.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [JsonPipe],
  providers: [ProductStore],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  readonly productStore = inject(ProductStore);

  constructor() {
    const query = this.productStore.filter.query;
    // 👇 Re-fetch products whenever the value of query signal changes.
    this.productStore.loadByQuery(query);
  }

  ngOnInit(): void {}
}
