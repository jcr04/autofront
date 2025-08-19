import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { PecasFacade } from '../../data-access/+state/pecas.facade';
import { PecasApi } from '../../data-access/pecas.api';
import { Categoria, Fabricante } from '../../../../shared/models/lookup.model';
import { LookupCreateDialogComponent } from '../lookup-create-dialog/lookup-create-dialog.component';

@Component({
  standalone: true,
  template: `
    <h1 mat-dialog-title>Nova Peça</h1>

    <div mat-dialog-content [formGroup]="form" class="form-grid">
      <mat-form-field appearance="fill">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="nome" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Código</mat-label>
        <input matInput formControlName="codigo" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Quantidade</mat-label>
        <input matInput type="number" formControlName="quantidade" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Preço</mat-label>
        <input matInput type="number" formControlName="preco" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Categoria</mat-label>
        <mat-select formControlName="categoriaId">
          <mat-option *ngFor="let c of categorias" [value]="c.id">{{ c.nome }}</mat-option>
        </mat-select>
        <button mat-icon-button type="button" matSuffix aria-label="Nova categoria" (click)="openCreate('categoria')">
          <mat-icon>add</mat-icon>
        </button>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fabricante</mat-label>
        <mat-select formControlName="fabricanteId">
          <mat-option *ngFor="let f of fabricantes" [value]="f.id">{{ f.nome }}</mat-option>
        </mat-select>
        <button mat-icon-button type="button" matSuffix aria-label="Novo fabricante" (click)="openCreate('fabricante')">
          <mat-icon>add</mat-icon>
        </button>
      </mat-form-field>
    </div>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Salvar</button>
    </div>
  `,
  styles: [`
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(220px, 1fr));
      gap: 12px;
      width: 560px;
      max-width: 100%;
    }
    @media (max-width: 640px) {
      .form-grid { grid-template-columns: 1fr; }
    }
  `],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule
  ],
})
export class PecaFormDialogComponent {
  private fb = inject(FormBuilder);
  private facade = inject(PecasFacade);
  private ref = inject(MatDialogRef<PecaFormDialogComponent>);
  private api = inject(PecasApi);
  private dialog = inject(MatDialog);

  categorias: Categoria[] = [];
  fabricantes: Fabricante[] = [];

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(120)]],
    codigo: ['', [Validators.required, Validators.maxLength(60)]],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    preco: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null as number | null, [Validators.required]],
    fabricanteId: [null as number | null, [Validators.required]],
  });

  constructor() {
    this.loadLookups();
  }

  private loadLookups() {
    this.api.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: () => (this.categorias = []),
    });
    this.api.getFabricantes().subscribe({
      next: (data) => (this.fabricantes = data),
      error: () => (this.fabricantes = []),
    });
  }

  openCreate(tipo: 'categoria' | 'fabricante') {
    const dlg = this.dialog.open(LookupCreateDialogComponent, { data: { tipo } });
    dlg.afterClosed().subscribe((created?: { id: number; nome: string }) => {
      if (!created) return;

      if (tipo === 'categoria') {
        this.categorias = [...this.categorias, created].sort((a, b) => a.nome.localeCompare(b.nome));
        this.form.patchValue({ categoriaId: created.id });
      } else {
        this.fabricantes = [...this.fabricantes, created].sort((a, b) => a.nome.localeCompare(b.nome));
        this.form.patchValue({ fabricanteId: created.id });
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.facade.create(this.form.value as any);
      this.ref.close();
    }
  }
}
