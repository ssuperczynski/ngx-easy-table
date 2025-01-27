import { Columns } from './columns';
import { Config } from './config';
import { Modifier } from './modifier';

export interface MetaRowProperties {
  // TODO add meta: {} and move everything there
  index: number;
  isCollapsed: boolean;
  radioSelected: boolean;
  checkboxSelected: boolean;
  classList: DOMTokenList;
  styles: DOMTokenList;
  cellClasses: DOMTokenList;
}

export interface AppState<T = any> {
  rows: Array<T & MetaRowProperties>;
  initialRows: Array<T & MetaRowProperties>;
  columns: Columns[];
  config: Config;
  modifiers: Modifier;
}
