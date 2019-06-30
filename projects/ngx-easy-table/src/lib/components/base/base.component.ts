import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { API, ApiType, ColumnKeyType, Columns, Config, Event, Pagination, TableMouseEvent } from '../..';
import { DefaultConfigService } from '../../services/config-service';
import { PaginationComponent, PaginationRange } from '../pagination/pagination.component';
import { GroupRowsService } from '../../services/group-rows.service';
import { StyleService } from '../../services/style.service';
import { Subject, Subscription } from 'rxjs';

interface RowContextMenuPosition {
  top: string | null;
  left: string | null;
  value: any | null;
}

@Component({
  selector: 'ngx-table',
  providers: [DefaultConfigService, GroupRowsService, StyleService],
  templateUrl: './base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnChanges {
  @ViewChild('paginationComponent', { static: false }) private paginationComponent: PaginationComponent;
  @ViewChild('th', { static: false }) private th;
  public selectedRow: number;
  public selectedCol: number;
  public term;
  public filterCount = -1;
  public filteredCountSubject = new Subject<number>();
  public subscription: Subscription;
  public tableClass = null;
  public globalSearchTerm: string;
  public grouped: any = [];
  public menuActive = false;
  public isSelected = false;
  public page = 1;
  public count = null;
  public sortState = new Map();
  public sortKey = null;
  public rowContextMenuPosition: RowContextMenuPosition = {
    top: null,
    left: null,
    value: null,
  };
  public limit;
  public sortBy: { key: string } & { order: string } = {
    key: '',
    order: 'asc',
  };
  public selectedDetailsTemplateRowId = new Set();
  public startOffset;
  public loadingHeight = '30px';
  public config: Config;
  onSelectAllBinded = this.onSelectAll.bind(this);

  @Input() configuration: Config;
  @Input() data: any[];
  @Input() pagination: Pagination;
  @Input() groupRowsBy: string;
  @Input() id = 'table';
  @Input() toggleRowIndex;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() summaryTemplate: TemplateRef<any>;
  @Input() groupRowsHeaderTemplate: TemplateRef<any>;
  @Input() filtersTemplate: TemplateRef<any>;
  @Input() selectAllTemplate: TemplateRef<any>;
  @Input() noResultsTemplate: TemplateRef<any>;
  @Input() rowContextMenu: TemplateRef<any>;
  @Input() columns: Columns[];
  @Output() readonly event = new EventEmitter<{ event: string, value: any }>();
  @ContentChild(TemplateRef, { static: true }) public rowTemplate: TemplateRef<any>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    public readonly styleService: StyleService,
  ) {
    this.subscription = this.filteredCountSubject.subscribe((count) => {
      this.filterCount = count;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    if (!this.columns) {
      console.error('[columns] property required!');
    }
    if (this.configuration) {
      this.config = this.configuration;
    } else {
      this.config = DefaultConfigService.config;
    }
    this.limit = this.config.rows;
    if (this.groupRowsBy) {
      this.grouped = GroupRowsService.doGroupRows(this.data, this.groupRowsBy);
    }
    this.doDecodePersistedState();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { configuration, data, pagination, groupRowsBy } = changes;
    this.toggleRowIndex = changes.toggleRowIndex;
    if (configuration && configuration.currentValue) {
      this.config = configuration.currentValue;
    }
    if (data && data.currentValue) {
      this.doApplyData(data);
    }
    if (pagination && pagination.currentValue) {
      this.count = pagination.currentValue.count;
    }
    if (groupRowsBy && groupRowsBy.currentValue) {
      this.grouped = GroupRowsService.doGroupRows(this.data, this.groupRowsBy);
    }
    if (this.toggleRowIndex && this.toggleRowIndex.currentValue) {
      const row = this.toggleRowIndex.currentValue;
      this.collapseRow(row.index);
    }
  }

  isOrderEnabled(column: Columns) {
    const columnOrderEnabled = column.orderEnabled === undefined ? true : !!column.orderEnabled;
    return this.config.orderEnabled && columnOrderEnabled;
  }

  orderBy(column: Columns): void {
    if (typeof column.orderEnabled !== 'undefined' && !column.orderEnabled) {
      return;
    }
    this.sortKey = column.key;
    if (!this.config.orderEnabled || this.sortKey === '') {
      return;
    }

    this.setColumnOrder(this.sortKey);
    if (!this.config.orderEventOnly && !column.orderEventOnly) {
      this.sortBy.key = this.sortKey;
      this.sortBy.order = this.sortState.get(this.sortKey);
    } else {
      this.sortBy.key = '';
      this.sortBy.order = '';
    }
    if (!this.config.serverPagination) {
      this.data = [...this.data];
    }
    this.sortBy = { ...this.sortBy };
    const value = {
      key: this.sortKey,
      order: this.sortState.get(this.sortKey),
    };
    this.emitEvent(Event.onOrder, value);
  }

  onClick($event: MouseEvent, row: object, key: ColumnKeyType, colIndex: number | null, rowIndex: number): void {
    if (this.config.selectRow) {
      this.selectedRow = rowIndex;
    }
    if (this.config.selectCol && colIndex) {
      this.selectedCol = colIndex;
    }
    if (this.config.selectCell && colIndex) {
      this.selectedRow = rowIndex;
      this.selectedCol = colIndex;
    }
    if (this.config.clickEvent) {
      const value: TableMouseEvent = {
        event: $event,
        row,
        key,
        rowId: rowIndex,
        colId: colIndex,
      };
      this.emitEvent(Event.onClick, value);
    }
  }

  onDoubleClick($event: MouseEvent, row: object, key: ColumnKeyType, colIndex: number | null, rowIndex: number): void {
    const value: TableMouseEvent = {
      event: $event,
      row,
      key,
      rowId: rowIndex,
      colId: colIndex,
    };
    this.emitEvent(Event.onDoubleClick, value);
  }

  onCheckboxSelect($event: object, row: object, rowIndex: number): void {
    const value = {
      event: $event,
      row,
      rowId: rowIndex,
    };
    this.emitEvent(Event.onCheckboxSelect, value);
  }

  onSelectAll() {
    this.isSelected = !this.isSelected;
    this.emitEvent(Event.onSelectAll, this.isSelected);
  }

  onSearch($event: Array<{ key: string; value: string }>): void {
    if (!this.config.serverPagination) {
      this.term = $event;
    }
    this.emitEvent(Event.onSearch, $event);
  }

  onGlobalSearch(value: string): void {
    if (!this.config.serverPagination) {
      this.globalSearchTerm = value;
    }
    this.emitEvent(Event.onGlobalSearch, value);
  }

  onPagination(pagination: PaginationRange): void {
    this.page = pagination.page;
    this.limit = pagination.limit;
    this.emitEvent(Event.onPagination, pagination);
  }

  private emitEvent(event: string, value: any): void {
    this.event.emit({ event, value });
    if (this.config.persistState) {
      localStorage.setItem(event, JSON.stringify(value));
    }
    if (this.config.logger) {
      // tslint:disable-next-line:no-console
      console.log({ event, value });
    }
  }

  collapseRow(rowIndex: number): void {
    if (this.selectedDetailsTemplateRowId.has(rowIndex)) {
      this.selectedDetailsTemplateRowId.delete(rowIndex);
      this.emitEvent(Event.onRowCollapsedHide, rowIndex);
    } else {
      this.selectedDetailsTemplateRowId.add(rowIndex);
      this.emitEvent(Event.onRowCollapsedShow, rowIndex);
    }
  }

  private doDecodePersistedState() {
    if (!this.config.persistState) {
      return;
    }
    const pagination = localStorage.getItem(Event.onPagination);
    const sort = localStorage.getItem(Event.onOrder);
    const search = localStorage.getItem(Event.onSearch);
    if (pagination) {
      this.onPagination(JSON.parse(pagination));
    }
    if (sort) {
      const { key, order } = JSON.parse(sort);
      this.bindApi({
        type: API.sortBy,
        value: { column: key, order },
      });
    }
    if (search) {
      this.bindApi({
        type: API.setInputValue,
        value: JSON.parse(search),
      });
    }
  }

  isRowCollapsed(rowIndex: number): boolean {
    if (this.config.collapseAllRows) {
      return true;
    }
    return this.selectedDetailsTemplateRowId.has(rowIndex);
  }

  onMouseDown(event, th) {
    if (!this.config.resizeColumn) {
      return;
    }
    this.th = th;
    this.startOffset = th.offsetWidth - event.pageX;
    this.emitEvent(Event.onColumnResizeMouseDown, event);
  }

  onMouseMove(event) {
    if (!this.config.resizeColumn) {
      return;
    }
    if (this.th && this.th.style) {
      this.th.style.width = this.startOffset + event.pageX + 'px';
      this.th.style.cursor = 'col-resize';
      this.th.style['user-select'] = 'none';
    }
  }

  onMouseUp(event) {
    if (!this.config.resizeColumn) {
      return;
    }
    this.emitEvent(Event.onColumnResizeMouseUp, event);
    this.th.style.cursor = 'default';
    this.th = undefined;
  }

  get isLoading(): boolean {
    const table = document.getElementById(this.id) as HTMLTableElement;
    if (table && table.rows && table.rows.length > 3) {
      this.getLoadingHeight(table.rows);
    }
    return this.config.isLoading;
  }

  getLoadingHeight(rows: any): void {
    const searchEnabled = this.config.searchEnabled ? 1 : 0;
    const headerEnabled = this.config.headerEnabled ? 1 : 0;
    const borderTrHeight = 1;
    const borderDivHeight = 2;
    this.loadingHeight = (rows.length - searchEnabled - headerEnabled) * (rows[3].offsetHeight - borderTrHeight) - borderDivHeight + 'px';
  }

  getColumnWidth(column: any): string | null {
    if (column.width) {
      return column.width;
    }
    return this.config.fixedColumnWidth ? 100 / this.columns.length + '%' : null;
  }

  getColumnDefinition(column: Columns): boolean {
    return column.searchEnabled || typeof column.searchEnabled === 'undefined';
  }

  get arrowDefinition(): boolean {
    return this.config.showDetailsArrow || typeof this.config.showDetailsArrow === 'undefined';
  }

  onRowContextMenu($event: MouseEvent, row: object, key: ColumnKeyType, colIndex: number | null, rowIndex: number): void {
    if (!this.config.showContextMenu) {
      return;
    }
    $event.preventDefault();
    const value: TableMouseEvent = {
      event: $event,
      row,
      key,
      rowId: rowIndex,
      colId: colIndex,
    };
    this.rowContextMenuPosition = {
      top: `${$event.y - 10}px`,
      left: `${$event.x - 10}px`,
      value,
    };

    this.emitEvent(Event.onRowContextMenu, value);
  }

  pinnedWidth(pinned: boolean, column: number): string {
    if (pinned) {
      return 150 * column + 'px'; //
    }
  }

  private doApplyData(data) {
    const order = this.columns.find((c) => !!c.orderBy);
    if (order) {
      this.sortState.set(this.sortKey, (order.orderBy === 'asc') ? 'desc' : 'asc');
      this.orderBy(order);
    } else {
      this.data = [...data.currentValue];
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    this.emitEvent(Event.onRowDrop, event);
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  // DO NOT REMOVE. It is called from parent component. See src/app/demo/api-doc/api-doc.component.ts
  apiEvent(event: ApiType): void | number {
    return this.bindApi(event);
  }

  // tslint:disable:no-big-function cognitive-complexity
  private bindApi(event: ApiType): void | number {
    switch (event.type) {
      case API.rowContextMenuClicked:
        this.rowContextMenuPosition = {
          top: null,
          left: null,
          value: null,
        };
        break;
      case API.toolPanelClicked:
        // TODO
        break;
      case API.toggleRowIndex:
        this.collapseRow(event.value);
        break;
      case API.setInputValue:
        if (this.config.searchEnabled) {
          event.value.forEach((input) => {
            const element = (document.getElementById(`search_${input.key}`) as HTMLInputElement);
            if (!element) {
              console.error(`Column '${input.key}' not available in the DOM. Have you misspelled a name?`);
            } else {
              element.value = input.value;
            }
          });
        }
        this.onSearch(event.value);
        this.cdr.detectChanges();
        break;
      case API.onGlobalSearch:
        this.onGlobalSearch(event.value);
        this.cdr.detectChanges();
        break;
      case API.setRowClass:
        if (Array.isArray(event.value)) {
          event.value.forEach((val) => this.styleService.setRowClass(val));
          break;
        }
        this.styleService.setRowClass(event.value);
        this.cdr.detectChanges();
        break;
      case API.setCellClass:
        if (Array.isArray(event.value)) {
          event.value.forEach((val) => this.styleService.setCellClass(val));
          break;
        }
        this.styleService.setCellClass(event.value);
        break;
      case API.setRowStyle:
        if (Array.isArray(event.value)) {
          event.value.forEach((val) => this.styleService.setRowStyle(val));
          break;
        }
        this.styleService.setRowStyle(event.value);
        break;
      case API.setCellStyle:
        if (Array.isArray(event.value)) {
          event.value.forEach((val) => this.styleService.setCellStyle(val));
          break;
        }
        this.styleService.setCellStyle(event.value);
        break;
      case API.setTableClass:
        this.tableClass = event.value;
        this.cdr.detectChanges();
        break;
      case API.getPaginationTotalItems:
        return this.paginationComponent.paginationDirective.getTotalItems();
      case API.getPaginationCurrentPage:
        return this.paginationComponent.paginationDirective.getCurrent();
      case API.getPaginationLastPage:
        return this.paginationComponent.paginationDirective.getLastPage();
      case API.setPaginationCurrentPage:
        this.paginationComponent.paginationDirective.setCurrent(event.value);
        break;
      case API.setPaginationRange:
        this.paginationComponent.ranges = event.value;
        break;
      case API.setPaginationPreviousLabel:
        this.paginationComponent.previousLabel = event.value;
        break;
      case API.setPaginationNextLabel:
        this.paginationComponent.nextLabel = event.value;
        break;
      case API.setPaginationDisplayLimit:
        this.paginationComponent.changeLimit(event.value, true);
        break;
      case API.sortBy:
        const column: Columns = { title: '', key: event.value.column, orderBy: event.value.order };
        this.orderBy(column);
        this.cdr.detectChanges();
        break;
      default:
        break;
    }
  }

  private setColumnOrder(key: string): void {
    switch (this.sortState.get(key)) {
      case '':
      case undefined:
        this.sortState.set(key, 'desc');
        break;
      case 'asc':
        this.config.threeWaySort ?
          this.sortState.set(key, '') :
          this.sortState.set(key, 'desc');
        break;
      case 'desc':
        this.sortState.set(key, 'asc');
        break;
    }
    if (this.sortState.size > 1) {
      const temp = this.sortState.get(key);
      this.sortState.clear();
      this.sortState.set(key, temp);
    }
  }
}
