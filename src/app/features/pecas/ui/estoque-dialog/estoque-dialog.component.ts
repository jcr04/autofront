import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PecasFacade } from '../../data-access/+state/pecas.facade';

@Component({
  standalone: true,
  template: `
    <h1 mat-dialog-title>Movimentar estoque</h1>
    <div mat-dialog-content [formGroup]="form">
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Quantidade</mat-label>
        <input matInput type="number" formControlName="quantidade" />
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Tipo</mat-label>
        <mat-select formControlName="tipo">
          <mat-option value="Entrada">Entrada</mat-option>
          <mat-option value="Saida">Saída</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Confirmar</button>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
})
export class EstoqueDialogComponent {
  private fb = inject(FormBuilder);
  private facade = inject(PecasFacade);
  private ref = inject(MatDialogRef<EstoqueDialogComponent>);
  private data = inject(MAT_DIALOG_DATA) as { id: number };

  form = this.fb.group({
    quantidade: [1, [Validators.required, Validators.min(1)]],
    tipo: ['Entrada', Validators.required],
  });

  save() {
    if (this.form.valid) {
      this.facade.movimentarEstoque(this.data.id, this.form.value as any);
      this.ref.close();
    }
  }
}
