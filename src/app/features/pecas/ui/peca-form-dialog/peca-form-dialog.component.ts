// C:\joao\front\autofront\autofront\src\app\features\pecas\ui\peca-form-dialog\peca-form-dialog.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PecasFacade } from '../../data-access/+state/pecas.facade';

@Component({
  standalone: true,
  template: `
    <h1 mat-dialog-title>Nova Peça</h1>
    <div mat-dialog-content [formGroup]="form">
      <mat-form-field appearance="fill"><mat-label>Nome</mat-label>
        <input matInput formControlName="nome">
      </mat-form-field>

      <mat-form-field appearance="fill"><mat-label>Código</mat-label>
        <input matInput formControlName="codigo">
      </mat-form-field>

      <mat-form-field appearance="fill"><mat-label>Quantidade</mat-label>
        <input matInput type="number" formControlName="quantidade">
      </mat-form-field>

      <mat-form-field appearance="fill"><mat-label>Preço</mat-label>
        <input matInput type="number" formControlName="preco">
      </mat-form-field>

      <mat-form-field appearance="fill"><mat-label>Categoria</mat-label>
        <input matInput type="number" formControlName="categoriaId">
      </mat-form-field>

      <mat-form-field appearance="fill"><mat-label>Fabricante</mat-label>
        <input matInput type="number" formControlName="fabricanteId">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Salvar</button>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class PecaFormDialogComponent {
  private fb = inject(FormBuilder);
  private facade = inject(PecasFacade);
  private ref = inject(MatDialogRef<PecaFormDialogComponent>);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(120)]],
    codigo: ['', [Validators.required, Validators.maxLength(60)]],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    preco: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [0, [Validators.required, Validators.min(1)]],
    fabricanteId: [0, [Validators.required, Validators.min(1)]],
  });

  save() {
    if (this.form.valid) {
      this.facade.create(this.form.value as any);
      this.ref.close();
    }
  }
}
