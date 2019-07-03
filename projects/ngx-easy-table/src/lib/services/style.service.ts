import { Injectable } from '@angular/core';
import { cellClass, cellStyle, rowClass, rowStyle } from '..';

@Injectable()
export class StyleService {
  public setRowClass(val: rowClass): void {
    const selector = `#table > tbody > tr:nth-child(${val.row})`;
    const row: HTMLTableRowElement = document.querySelector(selector);
    if (row) {
      row.classList.add(val.className);
    }
  }

  public setCellClass(val: cellClass): void {
    const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
    const cell: HTMLTableCellElement = document.querySelector(selector);
    if (cell) {
      cell.classList.add(val.className);
    }
  }

  public setRowStyle(val: rowStyle): void {
    const selector = `#table > tbody > tr:nth-child(${val.row})`;
    const row: HTMLTableRowElement = document.querySelector(selector);
    if (row) {
      // tslint:disable-next-line:no-string-literal
      row.style[val.attr] = val.value;
    }
  }

  public setCellStyle(val: cellStyle): void {
    const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
    const cell: HTMLTableCellElement = document.querySelector(selector);
    if (cell) {
      // tslint:disable-next-line:no-string-literal
      cell.style[val.attr] = val.value;
    }
  }

  public pinnedWidth(pinned: boolean, column: number): string {
    if (pinned) {
      return 150 * column + 'px'; //
    }
  }
}
