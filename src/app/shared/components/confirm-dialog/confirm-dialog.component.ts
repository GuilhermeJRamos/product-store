import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>Confirmação</h1>
    <div mat-dialog-content>
      <p>{{ message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Não</button>
      <button mat-button color="warn" (click)="onYesClick()">Sim</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close(false); // Fecha o diálogo retornando false
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Fecha o diálogo retornando true
  }
}
