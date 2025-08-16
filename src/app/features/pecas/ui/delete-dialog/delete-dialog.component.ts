import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PecasFacade } from '../../data-access/+state/pecas.facade';

@Component({
  standalone: true,
  template: `
    <h1 mat-dialog-title>Excluir peça</h1>
    <div mat-dialog-content>Tem certeza que deseja excluir esta peça?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="confirm()">Excluir</button>
    </div>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class DeleteDialogComponent {
  private data = inject(MAT_DIALOG_DATA) as { id: number };
  constructor(private facade: PecasFacade, private ref: MatDialogRef<DeleteDialogComponent>) {}
  close() { this.ref.close(); }
  confirm() { this.facade.delete(this.data.id); this.ref.close(); }
}
