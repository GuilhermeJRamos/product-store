import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  ProductsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit(product: Product) {
    this.ProductsService.put(this.product.id, product).subscribe(() => {
      this.matSnackBar.open('Product Editado com Sucesso', 'Close');
      this.router.navigate(['/']);
    });
  }
}
