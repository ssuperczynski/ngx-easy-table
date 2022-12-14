import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { API, ApiType, Columns, Config, Event, Pagination } from '../..';
import { DefaultConfigService } from '../../services/config-service';
import { PaginationComponent, PaginationRange } from '../pagination/pagination.component';
import { GroupRowsService } from '../../services/group-rows.service';
import { StyleService } from '../../services/style.service';
import { Subject } from 'rxjs';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter, takeUntil, throttleTime } from 'rxjs/operators';

type ColumnKeyType = string | number | boolean;

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
export class BaseComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  public selectedRow: number;
  public selectedCol: number;
  public term: any;
  public filterCount = -1;
  public filteredCountSubject = new Subject<number>();
  public tableClass: string | null = null;
  public globalSearchTerm: string;
  public grouped: any = [];
  public isSelected = false;
  public page = 1;
  public count = 0;
  public sortState = new Map();
  public sortKey: string | null = null;
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
  public selectedDetailsTemplateRowId = new Set<number>();
  public selectedCheckboxes = new Set<number>();
  public config: Config;

  @Input() configuration: Config;
  @Input() data: any[];
  @Input() pagination: Pagination;
  @Input() groupRowsBy: string;
  @Input() id = 'table';
  @Input() toggleRowIndex;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() summaryTemplate: TemplateRef<{ total: number; limit: number; page: number }>;
  @Input() groupRowsHeaderTemplate: TemplateRef<any>;
  @Input() filtersTemplate: TemplateRef<any>;
  @Input() selectAllTemplate: TemplateRef<any>;
  @Input() noResultsTemplate: TemplateRef<void>;
  @Input() loadingTemplate: TemplateRef<void>;
  @Input() additionalActionsTemplate: TemplateRef<void>;
  @Input() rowContextMenu: TemplateRef<any>;
  @Input() columns: Columns[];
  @Output() readonly event = new EventEmitter<{ event: string; value: any }>();
  @ContentChild(TemplateRef, { static: false }) public rowTemplate: TemplateRef<any>;
  @ViewChild('paginationComponent') private paginationComponent: PaginationComponent;
  @ViewChild('contextMenu') contextMenu;
  @ViewChild('table') table;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  @HostListener('document:click', ['$event.target'])
  public onContextMenuClick(targetElement: any): void {
    if (this.contextMenu && !this.contextMenu.nativeElement.contains(targetElement)) {
      this.rowContextMenuPosition = {
        top: null,
        left: null,
        value: null,
      };
    }
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly scrollDispatcher: ScrollDispatcher,
    public readonly styleService: StyleService
  ) {
    this.filteredCountSubject.pipe(takeUntil(this.unsubscribe)).subscribe((count) => {
      setTimeout(() => {
        this.filterCount = count;
        this.cdr.detectChanges();
      });
    });
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    const throttleValue = this.config.infiniteScrollThrottleTime
      ? this.config.infiniteScrollThrottleTime
      : 200;
    this.scrollDispatcher
      .scrolled()
      .pipe(
        throttleTime(throttleValue),
        filter((event) => {
          return (
            !!event &&
            this.viewPort &&
            this.viewPort.getRenderedRange().end === this.viewPort.getDataLength()
          );
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.emitEvent(Event.onInfiniteScrollEnd, null);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { configuration, data, pagination, groupRowsBy } = changes;
    this.toggleRowIndex = changes.toggleRowIndex;
    if (configuration && configuration.currentValue) {
      this.config = configuration.currentValue;
    }
    if (data && data.currentValue) {
      this.doApplyData(data);
    }
    if (pagination && pagination.currentValue) {
      const { count, limit, offset } = pagination.currentValue as Pagination;
      this.count = count;
      this.limit = limit;
      this.page = offset;
    }
    if (groupRowsBy && groupRowsBy.currentValue) {
      this.grouped = GroupRowsService.doGroupRows(this.data, this.groupRowsBy);
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
    this.sortKey = column.key;
    if (!this.config.orderEnabled || this.sortKey === '') {
      return;
    }

    this.setColumnOrder(column);
    if (!this.config.orderEventOnly && !column.orderEventOnly) {
      this.sortBy.key = this.sortKey;
      this.sortBy.order = this.sortState.get(this.sortKey);
    } else {
      this.sortBy.key = '';
      this.sortBy.order = '';
    }
    if (!this.config.serverPagination) {
      this.data = [...this.data];
      this.sortBy = { ...this.sortBy };
    }

    const value = {
      key: this.sortKey,
      order: this.sortState.get(this.sortKey),
    };
    this.emitEvent(Event.onOrder, value);
  }

  onClick($event: MouseEvent, row: any, key: ColumnKeyType, colIndex: any, rowIndex: number): void {
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

  onDoubleClick(
    $event: MouseEvent,
    row: any,
    key: ColumnKeyType,
    colIndex: any,
    rowIndex: number
  ): void {
    const value = {
      event: $event,
      row,
      key,
      rowId: rowIndex,
      colId: colIndex,
    };
    this.emitEvent(Event.onDoubleClick, value);
  }

  onCheckboxSelect($event: any, row: any, rowIndex: number): void {
    const value = {
      event: $event,
      row,
      rowId: rowIndex,
    };
    this.emitEvent(Event.onCheckboxSelect, value);
  }

  onRadioSelect($event: any, row: any, rowIndex: number): void {
    const value = {
      event: $event,
      row,
      rowId: rowIndex,
    };
    this.emitEvent(Event.onRadioSelect, value);
  }

  onSelectAll(): void {
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

  toggleCheckbox(rowIndex: number): void {
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    this.selectedCheckboxes.has(rowIndex)
      ? this.selectedCheckboxes.delete(rowIndex)
      : this.selectedCheckboxes.add(rowIndex);
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

  private doDecodePersistedState(): void {
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

  get loadingHeight(): number {
    const table = document.getElementById(this.id) as HTMLTableElement;
    if (table && table.rows && table.rows.length > 3) {
      const searchEnabled = this.config.searchEnabled ? 1 : 0;
      const headerEnabled = this.config.headerEnabled ? 1 : 0;
      const borderTrHeight = 1;
      const borderDivHeight = 2;
      return (
        (table.rows.length - searchEnabled - headerEnabled) *
          (table.rows[3].offsetHeight - borderTrHeight) -
        borderDivHeight
      );
    }

    return 30;
  }

  get arrowDefinition(): boolean {
    return this.config.showDetailsArrow || typeof this.config.showDetailsArrow === 'undefined';
  }

  onRowContextMenu(
    $event: MouseEvent,
    row: any,
    key: ColumnKeyType,
    colIndex: any,
    rowIndex: number
  ): void {
    if (!this.config.showContextMenu) {
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
    this.rowContextMenuPosition = {
      top: `${$event.pageY - 10}px`,
      left: `${$event.pageX - 10}px`,
      value,
    };

    this.emitEvent(Event.onRowContextMenu, value);
  }

  private doApplyData(data: SimpleChange): void {
    const order = this.columns.find((c) => !!c.orderBy);
    if (order) {
      this.sortState.set(this.sortKey, order.orderBy === 'asc' ? 'desc' : 'asc');
      this.orderBy(order);
    } else {
      this.data = [...data.currentValue];
    }
  }

  onDragStart(event: CdkDragStart): void {
    this.emitEvent(Event.onReorderStart, event);
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    this.emitEvent(Event.onRowDrop, event);
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  // DO NOT REMOVE. It is called from parent component. See src/app/demo/api-doc/api-doc.component.ts
  apiEvent(event: ApiType): void | number {
    return this.bindApi(event);
  }

  /* eslint-disable */
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
      case API.toggleCheckbox:
        this.toggleCheckbox(event.value);
        break;
      case API.setInputValue:
        if (this.config.searchEnabled) {
          event.value.forEach((input) => {
            const element = document.getElementById(`search_${input.key}`) as HTMLInputElement;
            if (!element) {
              console.error(
                `Column '${input.key}' not available in the DOM. Have you misspelled a name?`
              );
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
      case API.getNumberOfRowsPerPage:
        return this.paginationComponent.paginationDirective.isLastPage()
          ? this.paginationComponent.paginationDirective.getTotalItems() % this.limit
          : this.limit;
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

  private setColumnOrder(column: Columns): void {
    const key: string = column.key;

    switch (this.sortState.get(key)) {
      case '':
      case undefined:
        this.sortState.set(key, column.orderBy || 'desc');
        break;
      case 'asc':
        this.config.threeWaySort ? this.sortState.set(key, '') : this.sortState.set(key, 'desc');
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

  public emitEvent(event: string, value: any): void {
    this.event.emit({ event, value });
    if (this.config.persistState) {
      localStorage.setItem(event, JSON.stringify(value));
    }
    if (this.config.logger) {
      // eslint-disable-next-line no-console
      console.log({ event, value });
    }
  }

  dragEnter($event: DragEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  dragOver($event: DragEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  dragLeave($event: DragEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  drop($event: DragEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    const file = $event.dataTransfer?.files?.[0];
    if (file?.type !== 'application/json') {
      // eslint-disable-next-line no-console
      console.log('File not allowed');
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      this.data = JSON.parse(event?.target?.result as string);
      this.cdr.markForCheck();
    };
    fileReader.readAsText(file);
  }
}
