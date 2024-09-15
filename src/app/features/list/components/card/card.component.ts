import { Product } from './../../../../shared/interfaces/product.interface';
import {
  Component,
  computed,
  input,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input.required<Product>();
  matSnackBar = inject(MatSnackBar);

  @Output() edit = new EventEmitter();

  ProductsService = inject(ProductsService);

  productTitle = computed(() => this.product().title);

  onDelete() {
    this.ProductsService.delete(this.product().id).subscribe(() => {
      this.matSnackBar.open('Product deleted', 'Close');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  onEdit() {
    this.edit.emit();
  }
}
