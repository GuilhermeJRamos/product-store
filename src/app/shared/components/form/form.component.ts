import { Product } from './../../interfaces/product.interface';
import { Component, EventEmitter, input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  product = input<Product | null>(null);
  form!: FormGroup;
  @Output() submit = new EventEmitter<Product>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title || '', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  onSubmit() {
    const product = this.form.value as Product;
    this.submit.emit(product);
  }
}
