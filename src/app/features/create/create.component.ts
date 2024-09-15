import { ProductsService } from './../../shared/services/products.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  ProductsService = inject(ProductsService);

  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  onSubmit(product: Product) {
    this.ProductsService.post(product).subscribe(() => {
      this.matSnackBar.open('Product created', 'Close');
      this.router.navigate(['/']);
    });
  }
}
