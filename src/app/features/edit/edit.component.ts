import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
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

  onSubmit() {
    this.ProductsService.put(this.product.id, {
      title: this.form.controls.title.value,
    }).subscribe(() => {
      this.matSnackBar.open('Product Editado com Sucesso', 'Close');
      this.router.navigate(['/']);
    });
  }
}
