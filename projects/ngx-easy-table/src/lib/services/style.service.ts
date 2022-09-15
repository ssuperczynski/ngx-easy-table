import { Injectable } from '@angular/core';
import { CellClass, CellStyle, RowClass, RowStyle } from '..';

@Injectable()
export class StyleService {

  public setRowClass(val: RowClass): void {
    const selector = `#table > tbody > tr:nth-child(${val.row})`;
    const row = document.querySelector(selector) as HTMLTableRowElement;
    if (row) {
      row.classList.add(val.className);
    }
  }

  public setCellClass(val: CellClass): void {
    const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
    const cell = document.querySelector(selector) as HTMLTableCellElement;
    if (cell) {
      cell.classList.add(val.className);
    }
  }

  public setRowStyle(val: RowStyle): void {
    const selector = `#table > tbody > tr:nth-child(${val.row})`;
    const row = document.querySelector(selector) as HTMLTableRowElement;
    if (row) {
      row.style[val.attr] = val.value;
    }
  }

  public setCellStyle(val: CellStyle): void {
    const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
    const cell = document.querySelector(selector) as HTMLTableCellElement;
    if (cell) {
      cell.style[val.attr] = val.value;
    }
  }

  public pinnedWidth(pinned: boolean | undefined, column: number): string | undefined {
    if (pinned) {
      return 150 * column + 'px';
    }
  }
}
