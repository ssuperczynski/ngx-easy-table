export type ColumnKeyType = string | number | boolean;

export interface TableMouseEvent {
  event: MouseEvent;
  row: object;
  key: ColumnKeyType;
  rowId: number | null;
  colId: number | null;
}
