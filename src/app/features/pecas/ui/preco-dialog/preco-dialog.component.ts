import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PecasFacade } from '../../data-access/+state/pecas.facade';

@Component({
  standalone: true,
  selector: 'app-preco-dialog',
  template: `
    <h1 mat-dialog-title>Atualizar preço</h1>
    <div mat-dialog-content [formGroup]="form">
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Novo preço (R$)</mat-label>
        <input matInput type="number" formControlName="novoPreco" />
        <mat-error *ngIf="form.controls.novoPreco.invalid">Informe um valor válido</mat-error>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Salvar</button>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class PrecoDialogComponent {
  private fb = inject(FormBuilder);
  private facade = inject(PecasFacade);
  private ref = inject(MatDialogRef<PrecoDialogComponent>);
  private data = inject(MAT_DIALOG_DATA) as { id: number };

  form = this.fb.group({ novoPreco: [0, [Validators.required, Validators.min(0)]] });

  save() {
    if (this.form.valid) {
      this.facade.updatePreco(this.data.id, this.form.value.novoPreco!);
      this.ref.close();
    }
  }
}
