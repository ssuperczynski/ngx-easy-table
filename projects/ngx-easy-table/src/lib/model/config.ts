export interface Config {
  searchEnabled: boolean;
  headerEnabled: boolean;
  orderEnabled: boolean;
  orderEventOnly?: boolean;
  paginationEnabled: boolean;
  exportEnabled?: boolean;
  clickEvent: boolean;
  selectRow: boolean;
  selectCol: boolean;
  selectCell: boolean;
  rows: number;
  additionalActions: boolean;
  serverPagination: boolean;
  isLoading: boolean;
  detailsTemplate: boolean;
  groupRows: boolean;
  paginationRangeEnabled: boolean;
  collapseAllRows: boolean;
  checkboxes: boolean;
  resizeColumn: boolean;
  fixedColumnWidth: boolean;
  horizontalScroll: boolean;
  draggable: boolean;
  logger: boolean;
  showDetailsArrow?: boolean;
  showContextMenu?: boolean;
  persistState?: boolean;
  paginationMaxSize?: number;
  threeWaySort?: boolean;
  tableLayout: {
    style: STYLE | string | null,
    theme: THEME | string | null,
    borderless: boolean | null,
    hover: boolean | null,
    striped: boolean | null,
  };
}

export enum STYLE {
  TINY = 'tiny',
  BIG = 'big',
  NORMAL = 'normal',
}

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}
