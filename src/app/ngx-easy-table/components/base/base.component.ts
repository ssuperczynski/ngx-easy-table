import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import { from } from 'rxjs';
import { flatMap, groupBy, reduce } from 'rxjs/operators';
import { Columns } from '../../model/columns';
import { Config } from '../../model/config';
import { Event } from '../../model/event.enum';
import { ConfigService } from '../../services/config-service';
import { UtilsService } from '../../services/utils-service';

type KeyType = string | number | boolean;

@Component({
  selector: 'ngx-table',
  providers: [ConfigService, UtilsService],
  templateUrl: './base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnChanges, AfterViewInit {
  public selectedRow: number;
  public selectedCol: number;
  public term;
  public config: Config;
  public globalSearchTerm;
  grouped: any = [];
  menuActive = false;
  isSelected = false;
  page = 1;
  count = null;
  limit;
  sortBy = {
    key: '',
    order: 'asc',
  };
  sortByIcon = {
    key: '',
    order: 'asc',
  };
  selectedDetailsTemplateRowId = new Set();
  id;
  th;
  startOffset;
  loadingHeight = '30px';
  @Input() configuration: Config;
  @Input() data: any[];
  @Input() pagination;
  @Input() groupRowsBy: string;
  @Input() toggleRowIndex;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() summaryTemplate: TemplateRef<any>;
  @Input() columns: Columns[];
  @Output() event = new EventEmitter();
  // Backwards compatibility for row template
  @ContentChild(TemplateRef) public rowTemplateOld: TemplateRef<any>;
  @ContentChild('rowTemplate', { read: TemplateRef }) public rowTemplateNew: TemplateRef<any>;
  public rowTemplate: TemplateRef<any>;
  @ContentChild('filtersTemplate', { read: TemplateRef }) public filtersTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {
    this.id = UtilsService.randomId();
  }

  ngOnInit() {
    if (!this.columns) {
      console.error('[columns] property required!');
    }
    if (this.configuration) {
      ConfigService.config = this.configuration;
    }
    this.rowTemplate = this.rowTemplateOld || this.rowTemplateNew;
    this.config = ConfigService.config;
    this.limit = this.config.rows;
    if (this.groupRowsBy) {
      this.doGroupRows();
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const data: SimpleChange = changes.data;
    const pagination: SimpleChange = changes.pagination;
    const configuration: SimpleChange = changes.configuration;
    const groupRowsBy: SimpleChange = changes.groupRowsBy;
    this.toggleRowIndex = changes.toggleRowIndex;
    if (data && data.currentValue) {
      this.data = [...data.currentValue];
    }
    if (pagination && pagination.currentValue) {
      this.count = pagination.currentValue.count;
    }
    if (configuration && configuration.currentValue) {
      this.config = configuration.currentValue;
      this.cdr.markForCheck();
    }
    if (groupRowsBy && groupRowsBy.currentValue) {
      this.doGroupRows();
    }
    if (this.toggleRowIndex && this.toggleRowIndex.currentValue) {
      const row = this.toggleRowIndex.currentValue;
      this.collapseRow(row.index);
    }
  }

  orderBy(column: Columns): void {
    if (typeof column.orderEnabled !== 'undefined' && !column.orderEnabled) {
      return;
    }
    const key = column.key;
    if (!ConfigService.config.orderEnabled || key === '') {
      return;
    }

    this.sortByIcon.key = key;
    if (this.sortByIcon.order === 'asc') {
      this.sortByIcon.order = 'desc';
    } else {
      this.sortByIcon.order = 'asc';
    }

    if (!ConfigService.config.orderEventOnly && !column.orderEventOnly) {
      this.sortBy.key = this.sortByIcon.key;
      this.sortBy.order = this.sortByIcon.order;
    } else {
      this.sortBy.key = '';
      this.sortBy.order = '';
    }
    if (!ConfigService.config.serverPagination) {
      this.data = [...this.data];
    }
    const value = {
      key,
      order: this.sortByIcon.order,
    };
    this.emitEvent(Event.onOrder, value);
  }

  onClick($event: object, row: object, key: KeyType, colIndex: number | null, rowIndex: number): void {
    if (ConfigService.config.selectRow) {
      this.selectedRow = rowIndex;
    }
    if (ConfigService.config.selectCol && colIndex) {
      this.selectedCol = colIndex;
    }
    if (ConfigService.config.selectCell && colIndex) {
      this.selectedRow = rowIndex;
      this.selectedCol = colIndex;
    }
    if (ConfigService.config.clickEvent) {
      const value = {
        event: $event,
        row,
        key,
        rowId: rowIndex,
        colId: colIndex,
      };
      this.emitEvent(Event.onClick, value);
    }
  }

  onDoubleClick($event: object, row: object, key: KeyType, colIndex: number | null, rowIndex: number): void {
    const value = {
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

  onSearch($event): void {
    if (!ConfigService.config.serverPagination) {
      this.term = $event;
    }
    this.emitEvent(Event.onSearch, $event);
  }

  onGlobalSearch($event): void {
    if (!ConfigService.config.serverPagination) {
      this.globalSearchTerm = $event;
    }
    this.emitEvent(Event.onGlobalSearch, $event);
  }

  onPagination($event): void {
    this.page = $event.page;
    this.limit = $event.limit;
    this.emitEvent(Event.onPagination, $event);
  }

  private emitEvent(event, value: any): void {
    this.event.emit({ event: Event[event], value });
    if (this.config.logger) {
      console.log({ event: Event[event], value });
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

  private doGroupRows() {
    this.grouped = [];
    from(this.data).pipe(
      groupBy((row) => row[this.groupRowsBy]),
      flatMap((group) => group.pipe(
        reduce((acc: object[], curr) => [...acc, curr], []),
      )),
    ).subscribe((row) => this.grouped.push(row));
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
    const table = document.getElementById('table');
    if (table && table['rows'] && table['rows'].length > 3) {
      this.getLoadingHeight(table['rows']);
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

  onRowDrag(event) {
    this.emitEvent(Event.onRowDrag, event);
  }

  onRowDrop(event) {
    this.emitEvent(Event.onRowDrop, event);
  }

  getColumnDefinition(column: Columns): boolean {
    return column.searchEnabled || typeof column.searchEnabled === 'undefined';
  }

  get arrowDefinition(): boolean {
    return this.config.showDetailsArrow || typeof this.config.showDetailsArrow === 'undefined';
  }

  onContextMenu($event: any, row: object, key: KeyType, colIndex: number | null, rowIndex: number): void {
    if (typeof this.config.showContextMenu === 'undefined' || !this.config.showContextMenu) {
      return;
    }
    $event.preventDefault();
    const value = {
      event: $event,
      row,
      key,
      rowId: rowIndex,
      colId: colIndex,
    };
    this.emitEvent(Event.onRowContextMenu, value);
  }
}
