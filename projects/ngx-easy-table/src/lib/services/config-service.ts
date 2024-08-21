import { Injectable } from '@angular/core';
import { Config, STYLE, THEME } from '../model/config';

// eslint-disable-next-line
export const DefaultConfig: Config = {
  searchEnabled: false,
  headerEnabled: true,
  orderEnabled: true,
  orderEventOnly: false,
  paginationEnabled: true,
  clickEvent: true,
  selectRow: false,
  selectCol: false,
  selectCell: false,
  rows: 10,
  additionalActions: false,
  serverPagination: false,
  isLoading: false,
  detailsTemplate: false,
  paginationRangeEnabled: true,
  collapseAllRows: false,
  checkboxes: false,
  radio: false,
  resizeColumn: false,
  fixedColumnWidth: true,
  horizontalScroll: false,
  showDetailsArrow: false,
  showContextMenu: false,
  persistState: false,
  threeWaySort: false,
  onDragOver: false,
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
