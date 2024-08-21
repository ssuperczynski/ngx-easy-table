export interface Config {
  searchEnabled: boolean;
  /* @deprecated Will be removed in the next version */
  headerEnabled: boolean;
  orderEnabled: boolean;
  orderEventOnly?: boolean;
  paginationEnabled: boolean;
  clickEvent: boolean;
  selectRow: boolean;
  selectCol: boolean;
  selectCell: boolean;
  rows: number;
  additionalActions: boolean;
  serverPagination: boolean;
  isLoading: boolean;
  detailsTemplate: boolean;
  /* @deprecated Will be removed in the next version */
  groupRows: boolean;
  paginationRangeEnabled: boolean;
  collapseAllRows: boolean;
  checkboxes: boolean;
  radio?: boolean;
  resizeColumn: boolean;
  fixedColumnWidth: boolean;
  horizontalScroll: boolean;
  logger: boolean;
  showDetailsArrow?: boolean;
  showContextMenu?: boolean;
  persistState?: boolean;
  /* @deprecated Will be removed in the next version */
  paginationMaxSize?: number;
  threeWaySort?: boolean;
  columnReorder?: boolean;
  /* @deprecated Will be removed in the next version */
  rowReorder?: boolean;
  reorderDelay?: number;
  infiniteScroll?: boolean;
  infiniteScrollThrottleTime?: number;
  onDragOver?: boolean;
  tableLayout: {
    style: STYLE | string | null;
    theme: THEME | string | null;
    borderless: boolean | null;
    hover: boolean | null;
    striped: boolean | null;
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
