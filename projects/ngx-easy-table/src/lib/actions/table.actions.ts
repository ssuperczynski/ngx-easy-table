import { createAction, props } from '@ngrx/store';
import { Config } from '../model/config';
import { Columns } from '../model/columns';
import { CellClass, CellStyle, RowClass, RowStyle } from '../model/api';

export const getRows = createAction('[Rows] Get');
export const setRows = createAction('[Rows] Set', props<{ rows: any[] }>());
export const setRowClass = createAction(
  '[Rows] Set class',
  props<{ classes: RowClass | RowClass[] }>()
);
export const setRowStyles = createAction(
  '[Rows] Set style',
  props<{ styles: RowStyle | RowStyle[] }>()
);
export const setCellClass = createAction(
  '[Cell] Set class',
  props<{ classes: CellClass | CellClass[] }>()
);
export const setCellStyle = createAction(
  '[Cell] Set style',
  props<{ styles: CellStyle | CellStyle[] }>()
);
export const globalSearch = createAction('[Rows] GlobalSearch', props<{ filter: string }>());
export const search = createAction(
  '[Rows] Search',
  props<{ filter: { key: string; value: string }[] }>()
);
export const collapseRow = createAction('[Rows] Collapse', props<{ index: number }>());
export const selectRadio = createAction('[Rows] Radio select', props<{ index: number }>());
export const selectCheckbox = createAction(
  '[Rows] Checkbox select',
  props<{ index: number; selected: boolean | null }>()
);

export const setFilters = createAction(
  '[Filters] Set',
  props<{ filter: { key: string; value: string }[] }>()
);
export const setOrder = createAction('[Column] Set order', props<{ column: Partial<Columns> }>());
export const setPagination = createAction(
  '[Pagination] Set',
  props<{ page: number; itemsPerPage: number }>()
);

export const getConfig = createAction('[Config] Get');
export const setConfig = createAction('[Config] Set', props<{ config: Config }>());

export const getColumns = createAction('[Columns] Get');
export const setColumns = createAction('[Columns] Set', props<{ columns: Columns[] }>());
