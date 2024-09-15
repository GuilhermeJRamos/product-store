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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input.required<Product>();
  matSnackBar = inject(MatSnackBar);
  matDialog = inject(MatDialog);

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  ProductsService = inject(ProductsService);

  productTitle = computed(() => this.product().title);

  onDelete() {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja deletar este produto?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Usuário confirmou a deleção
        this.ProductsService.delete(this.product().id).subscribe(() => {
          this.matSnackBar.open('Produto deletado', 'Fechar');

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      }
    });
  }

  onEdit() {
    this.edit.emit();
  }
}
