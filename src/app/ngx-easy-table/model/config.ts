export interface Config {
  searchEnabled: boolean;
  headerEnabled: boolean;
  orderEnabled: boolean;
  globalSearchEnabled: boolean;
  paginationEnabled: boolean;
  exportEnabled: boolean;
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
  tableLayout: {
    style: string,
    theme: string,
    borderless: boolean,
    hover: boolean,
    striped: boolean,
  };
}
