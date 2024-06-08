import * as Actions from '../actions/table.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CellClass, CellStyle, RowClass, RowStyle } from '../model/api';
import { Columns } from '../model/columns';

@Injectable()
export class Facade {
  constructor(private store: Store) {}

  setPagination(page: number, itemsPerPage: number): void {
    this.store.dispatch(
      Actions.setPagination({
        page: page,
        itemsPerPage: itemsPerPage,
      })
    );
  }

  setRows(rows: any): void {
    this.store.dispatch(Actions.setRows({ rows: rows }));
  }

  setColumns(columns: Columns[]): void {
    this.store.dispatch(Actions.setColumns({ columns: columns }));
  }

  setRowClass(classes: RowClass | RowClass[]): void {
    this.store.dispatch(Actions.setRowClass({ classes }));
  }

  setRowStyle(styles: RowStyle | RowStyle[]): void {
    this.store.dispatch(Actions.setRowStyles({ styles }));
  }

  setCellClass(classes: CellClass | CellClass[]): void {
    this.store.dispatch(Actions.setCellClass({ classes }));
  }

  setCellStyle(styles: CellStyle | CellStyle[]): void {
    this.store.dispatch(Actions.setCellStyle({ styles }));
  }

  selectCheckbox(index: number, selected: boolean | null): void {
    this.store.dispatch(Actions.selectCheckbox({ index, selected }));
  }
}
