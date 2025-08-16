import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Peca } from '../../../../shared/models/peca.model';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-peca-list',
  templateUrl: './peca-list.component.html',
  styleUrls: ['./peca-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class PecaListComponent {
  @Input() data: Peca[] = [];
  @Input() total = 0;
  @Input() page = 1;
  @Input() pageSize = 20;

  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();
  @Output() create = new EventEmitter<void>();
  @Output() editarPreco = new EventEmitter<number>();
  @Output() estoque = new EventEmitter<number>();
  @Output() excluir = new EventEmitter<number>();

  cols = ['nome', 'codigo', 'quantidade', 'preco', 'acoes'];

  onPage(ev: PageEvent) {
    this.pageChange.emit({ pageIndex: ev.pageIndex, pageSize: ev.pageSize });
  }
}
