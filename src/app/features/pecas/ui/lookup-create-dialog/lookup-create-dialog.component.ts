import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PecasApi } from '../../data-access/pecas.api';

type TipoLookup = 'categoria' | 'fabricante';

@Component({
  standalone: true,
  template: `
    <h1 mat-dialog-title>Nova {{ titulo }}</h1>
    <div mat-dialog-content [formGroup]="form">
      <mat-form-field appearance="fill" style="width: 360px; max-width: 100%">
        <mat-label>Nome da {{ titulo.toLowerCase() }}</mat-label>
        <input matInput formControlName="nome" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="ref.close()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Salvar</button>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LookupCreateDialogComponent {
  private fb = inject(FormBuilder);
  private api = inject(PecasApi);
  readonly ref = inject(MatDialogRef<LookupCreateDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as { tipo: TipoLookup };

  readonly titulo = this.data.tipo === 'categoria' ? 'Categoria' : 'Fabricante';

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(80)]],
  });

  save() {
    if (this.form.invalid) return;
    const nome = this.form.value.nome!.trim();

    const req$ =
      this.data.tipo === 'categoria'
        ? this.api.createCategoria(nome)
        : this.api.createFabricante(nome);

    req$.subscribe({
      next: (res) => {
        // Retorna o item criado (id do back + nome informado)
        this.ref.close({ id: res.id, nome });
      },
      error: () => this.ref.close(),
    });
  }
}
