import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type TableColumn = {
  key: string;
  label: string;
  width?: string;
};

type TableAction = {
  action: string; // identifier emitted when clicked
  label?: string; // visible text
  icon?: string; // optional material icon name
  class?: string; // extra CSS classes
};

@Component({
  selector: 'app-tornado-table',
  imports: [CommonModule, MatIconModule],
  templateUrl: './tornado-table.component.html',
  styleUrls: ['./tornado-table.component.scss']
})
export class TornadoTableComponent {

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() showHeader = true;

  @Output() rowAction = new EventEmitter<{ action: string; row: any }>();

  trackByIndex(index: number) {
    return index;
  }

  emitAction(action: string, row: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.rowAction.emit({ action, row });
  }

}
