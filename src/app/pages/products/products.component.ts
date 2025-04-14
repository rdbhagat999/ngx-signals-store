import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
    selector: 'app-products',
    imports: [ProductListComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {}
