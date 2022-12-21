export enum API {
  rowContextMenuClicked = 'rowContextMenuClicked',
  setInputValue = 'setInputValue',
  toggleRowIndex = 'toggleRowIndex',
  toggleCheckbox = 'toggleCheckbox',
  onGlobalSearch = 'onGlobalSearch',
  setPaginationCurrentPage = 'setPaginationCurrentPage',
  getPaginationCurrentPage = 'getPaginationCurrentPage',
  getPaginationTotalItems = 'getPaginationTotalItems',
  getNumberOfRowsPerPage = 'getNumberOfRowsPerPage',
  getPaginationLastPage = 'getPaginationLastPage',
  setPaginationRange = 'setPaginationRange',
  setPaginationPreviousLabel = 'setPaginationPreviousLabel',
  setPaginationNextLabel = 'setPaginationNextLabel',
  setPaginationDisplayLimit = 'setPaginationDisplayLimit',
  setTableClass = 'setTableClass',
  setRowClass = 'setRowClass',
  setCellClass = 'setCellClass',
  setRowStyle = 'setRowStyle',
  setCellStyle = 'setCellStyle',
  sortBy = 'sortBy',
}

export interface RowClass {
  row: number;
  className: string;
}
export interface CellClass {
  row: number;
  cell: number | string;
  className: string;
}
export interface RowStyle {
  row: number;
  attr: string;
  value: string;
}
export interface CellStyle {
  row: number;
  cell: number;
  attr: string;
  value: string;
}

export type ApiType =
  | { type: API.rowContextMenuClicked }
  | { type: API.setInputValue; value: Array<{ key: string; value: string }> }
  | { type: API.toggleRowIndex; value: number }
  | { type: API.toggleCheckbox; value: number }
  | { type: API.onGlobalSearch; value: string }
  | { type: API.setPaginationCurrentPage; value: number }
  | { type: API.getPaginationCurrentPage }
  | { type: API.getPaginationTotalItems }
  | { type: API.getPaginationLastPage }
  | { type: API.getNumberOfRowsPerPage }
  | { type: API.setPaginationRange; value: number[] }
  | { type: API.setPaginationPreviousLabel; value: string }
  | { type: API.setPaginationNextLabel; value: string }
  | { type: API.setPaginationDisplayLimit; value: number }
  | { type: API.setTableClass; value: string | null }
  | { type: API.setRowClass; value: RowClass | RowClass[] }
  | { type: API.setCellClass; value: CellClass | CellClass[] }
  | { type: API.setRowStyle; value: RowStyle | RowStyle[] }
  | { type: API.setCellStyle; value: CellStyle | CellStyle[] }
  | { type: API.sortBy; value: { column: string; order: 'asc' | 'desc' } };

export interface APIDefinition {
  apiEvent<B extends ApiType>(event: B): IAPIDefinition<B>;
}

export type IAPIDefinition<B> = B extends
  | { type: API.getPaginationCurrentPage }
  | { type: API.getPaginationTotalItems }
  | { type: API.getPaginationLastPage }
  | { type: API.getNumberOfRowsPerPage }
  ? number
  : void;
