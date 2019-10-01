import { Injectable } from '@angular/core';
import { Config, STYLE, THEME } from '../model/config';

export const DefaultConfig: Config = {
  searchEnabled: false,
  headerEnabled: true,
  orderEnabled: true,
  orderEventOnly: false,
  paginationEnabled: true,
  exportEnabled: false,
  clickEvent: true,
  selectRow: false,
  selectCol: false,
  selectCell: false,
  rows: 10,
  additionalActions: false,
  serverPagination: false,
  isLoading: false,
  detailsTemplate: false,
  groupRows: false,
  paginationRangeEnabled: true,
  collapseAllRows: false,
  checkboxes: false,
  resizeColumn: false,
  fixedColumnWidth: true,
  horizontalScroll: false,
  draggable: false,
  logger: false,
  showDetailsArrow: false,
  showContextMenu: false,
  persistState: false,
  paginationMaxSize: 5,
  threeWaySort: false,
  tableLayout: {
    style: STYLE.NORMAL,
    theme: THEME.LIGHT,
    borderless: false,
    hover: true,
    striped: false,
  },
};

@Injectable()
export class DefaultConfigService {
  public static config: Config = DefaultConfig;
}
