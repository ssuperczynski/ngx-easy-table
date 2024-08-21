import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { API, ApiType, Columns, Config, Event, Pagination } from '../..';
import { DefaultConfigService } from '../../services/config-service';
import { Observable, Subject } from 'rxjs';
import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';
import { filter, takeUntil, throttleTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as Actions from '../../actions/table.actions';
import {
  selectModifiers,
  selectTableColumns,
  selectTableConfig,
  selectTableRows,
} from '../../selectors/table.selector';
import { MetaRowProperties } from '../../model/app-state';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Modifier } from '../../model/modifier';
import { Facade } from '../../facade/table.facade';
import { TableTHeadComponent } from '../thead/thead.component';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { RenderPipe } from '../../pipes/render-pipe';
import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { EventService } from '../../services/event.service';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'ngx-table',
  providers: [DefaultConfigService, Facade],
  templateUrl: './base.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TableTHeadComponent,
    PaginatePipe,
    RenderPipe,
    NgClass,
    NgStyle,
    NgIf,
    NgFor,
    NgTemplateOutlet,
    MatPaginatorModule,
    CdkVirtualScrollViewport,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkContextMenuTrigger,
    CdkVirtualForOf,
  ],
})
export class BaseComponent<T = any> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private store = inject(Store);
  private facade = inject(Facade);
  private eventService = inject(EventService);
  public selectedRow: number;
  public selectedCol: number;
  public isSelected = false;
  public modifiers: Modifier;
  public config: Config;
  public rows: Array<T & MetaRowProperties>;
  public cellTemplates: { [key: string]: TemplateRef<any> } = {};
  public headerActionTemplates: { [key: string]: TemplateRef<any> } = {};

  data$: Observable<Array<T & MetaRowProperties>>;
  columns$: Observable<Columns[]>;
  config$: Observable<Config>;

  @Input() configuration: Config;
  @Input() data: T[];
  @Input() pagination: Pagination;
  @Input() id = 'table';
  @Input() toggleRowIndex;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() summaryTemplate: TemplateRef<{ total: number; limit: number; page: number }>;
  @Input() filtersTemplate: TemplateRef<any>;
  @Input() selectAllTemplate: TemplateRef<any>;
  @Input() noResultsTemplate: TemplateRef<void>;
  @Input() loadingTemplate: TemplateRef<void>;
  @Input() additionalActionsTemplate: TemplateRef<void>;
  @Input() rowContextMenu: TemplateRef<any>;
  @Input() columns: Columns[];
  @Output() readonly event = new EventEmitter<{ event: string; value: any }>();
  @ContentChild(TemplateRef) public rowTemplate: TemplateRef<any>;
  @ViewChild('table') table;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  ngOnInit(): void {
    this.store
      .select(selectTableRows)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.rows = data;
        this.cdr.markForCheck();
      });
    this.store
      .select(selectTableColumns)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((columns) => {
        this.columns = columns;
        this.cdr.markForCheck();
      });
    this.store
      .select(selectTableConfig)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((config) => {
        this.config = config;
        this.cdr.markForCheck();
      });
    this.store
      .select(selectModifiers)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((modifiers) => {
        this.modifiers = modifiers;
        this.cdr.markForCheck();
      });
    this.eventService
      .getSubject()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(({ payload, state }) => {
        this.event.emit({ event: payload.type, value: state.table });
      });

    this.facade.setColumns(this.columns);
    this.store.dispatch(Actions.setConfig({ config: this.configuration }));
    this.facade.setRows(this.data);
    this.facade.setPagination(0, this.config.rows);

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
        // this.emitEvent(Event.onInfiniteScrollEnd, null);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { configuration, data, pagination, columns, toggleRowIndex } = changes;
    if (configuration && configuration.currentValue) {
      this.store.dispatch(Actions.setConfig({ config: configuration.currentValue }));
    }
    if (columns && columns.currentValue) {
      // backward compatible since NGRX can't store TemplateRefs
      this.cellTemplates = (columns.currentValue as Columns[])
        .filter((column) => column.cellTemplate)
        .reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item.cellTemplate,
          }),
          {}
        );
      this.headerActionTemplates = (columns.currentValue as Columns[])
        .filter((column) => column.headerActionTemplate)
        .reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item.headerActionTemplate,
          }),
          {}
        );

      const columnsWithoutTemplateRefs = columns.currentValue.map((column) => ({
        ...column,
        cellTemplate: !!column.cellTemplate,
        headerActionTemplate: !!column.headerActionTemplate,
      }));
      this.facade.setColumns(columnsWithoutTemplateRefs);
    }
    if (data && data.currentValue) {
      this.doApplyData(data.currentValue);
    }
    if (pagination && pagination.currentValue) {
      const { limit, offset } = pagination.currentValue as Pagination;
      this.facade.setPagination(offset, limit);
    }

    if (toggleRowIndex && toggleRowIndex.currentValue) {
      this.store.dispatch(Actions.collapseRow({ index: toggleRowIndex.currentValue.index }));
    }
  }

  onClick($event: MouseEvent, row: any, key: string, colIndex: any, rowIndex: number): void {
    if (this.config.selectRow) {
      this.selectedRow = rowIndex;
    }
    if (this.config.selectCol && `${colIndex}`) {
      this.selectedCol = colIndex;
    }
    if (this.config.selectCell && `${colIndex}`) {
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

  onDoubleClick($event: MouseEvent, row: any, key: string, colIndex: any, rowIndex: number): void {
    const value = {
      event: $event,
      row,
      key,
      rowId: rowIndex,
      colId: colIndex,
    };
    this.emitEvent(Event.onDoubleClick, value);
  }

  onCheckboxSelect(e: any, index: number): void {
    this.facade.selectCheckbox(index, (e.target as HTMLInputElement).checked);
  }

  onRadioSelect(rowIndex: number): void {
    this.store.dispatch(Actions.selectRadio({ index: rowIndex }));
  }

  onSelectAll(): void {
    this.isSelected = !this.isSelected;
    this.emitEvent(Event.onSelectAll, this.isSelected);
  }

  collapseRow(rowIndex: number): void {
    this.store.dispatch(Actions.collapseRow({ index: rowIndex }));
  }

  private doDecodePersistedState(): void {
    if (!this.config.persistState) {
      return;
    }
    const pagination = localStorage.getItem(Event.onPagination);
    const sort = localStorage.getItem(Event.onOrder);
    const search = localStorage.getItem(Event.onSearch);
    if (pagination) {
      this.paginationEvent(JSON.parse(pagination));
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

  private doApplyData(data: any[]): void {
    const order = this.columns.find((c) => !!c.orderBy);
    if (order) {
      // this.sortState.set(this.sortKey, order.orderBy === 'asc' ? 'desc' : 'asc');
      // this.orderBy(order);
    } else {
      this.facade.setRows(data);
    }
  }

  // DO NOT REMOVE. It is called from parent component. See src/app/demo/api-doc/api-doc.component.ts
  apiEvent(event: ApiType): void | number {
    return this.bindApi(event);
  }

  /* eslint-disable */
  private bindApi(event: ApiType): void | number {
    switch (event.type) {
      case API.toggleRowIndex:
        this.store.dispatch(Actions.collapseRow({ index: event.value }));
        break;
      case API.toggleCheckbox:
        this.facade.selectCheckbox(event.value, null);
        break;
      case API.setInputValue:
        this.store.dispatch(Actions.setFilters({ filter: event.value }));
        break;
      case API.onGlobalSearch:
        this.store.dispatch(Actions.globalSearch({ filter: event.value }));
        break;
      case API.setRowClass:
        this.facade.setRowClass(event.value);
        break;
      case API.setCellClass:
        this.facade.setCellClass(event.value);
        break;
      case API.setRowStyle:
        this.facade.setRowStyle(event.value);
        break;
      case API.setCellStyle:
        this.facade.setCellStyle(event.value);
        break;
      case API.getPaginationTotalItems:
        return this.modifiers.pagination.filteredCollectionSize;
      case API.getPaginationCurrentPage:
        return this.modifiers.pagination.currentPage;
      case API.getNumberOfRowsPerPage:
        return this.modifiers.pagination.itemsPerPage;
      case API.setPaginationCurrentPage:
        this.facade.setPagination(event.value - 1, this.modifiers.pagination.itemsPerPage);
        break;
      case API.setPaginationDisplayLimit:
        this.facade.setPagination(0, event.value);
        break;
      case API.sortBy:
        const column = { key: event.value.column, orderBy: event.value.order };
        this.store.dispatch(Actions.setOrder({ column }));
        break;
      default:
        break;
    }
  }

  public emitEvent(event: string, value: any): void {
    // TODO remove me
    this.event.emit({ event, value });
    if (this.config.persistState) {
      localStorage.setItem(event as string, JSON.stringify(value));
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
      const rows = JSON.parse(event?.target?.result as string);
      const columns = Object.keys(rows[0]).map((column) => ({ key: column, title: column }));
      this.facade.setColumns(columns);
      this.facade.setRows(rows);
    };
    fileReader.readAsText(file);
  }

  paginationEvent($event: PageEvent): void {
    this.facade.setPagination($event.pageIndex, $event.pageSize);
  }

  trackRowByIndex(_index: number, row: any): number {
    return row.index;
  }

  trackColumnByKey(_index: number, column: Columns): string {
    return column.key;
  }
}
