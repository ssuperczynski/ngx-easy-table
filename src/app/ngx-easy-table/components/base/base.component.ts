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
  TemplateRef
} from '@angular/core';

import { ResourceService } from '../../services/resource-service';
import { ConfigService } from '../../services/config-service';
import { Event } from '../../model/event.enum';
import { LoggerService } from '../../services/logger.service';
import { Config } from '../../model/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/groupBy';

@Component({
  selector: 'ngx-table',
  providers: [ResourceService, LoggerService, ConfigService],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit, OnChanges, AfterViewInit {
  public selectedRow: number;
  public selectedCol: number;
  public term;
  public config: Config;
  public globalSearchTerm;
  grouped = [];
  menuActive = false;
  page = 1;
  count = null;
  limit;
  selectedDetailsTemplateRowId = null;
  id;
  @Input() configuration: Config;
  @Input() data: Array<Object>;
  @Input() pagination;
  @Input() groupRowsBy;
  @Input() detailsTemplate;
  @Input() columns: Array<string>;
  @Output() event = new EventEmitter();
  @ContentChild(TemplateRef) public rowTemplate: TemplateRef<any>;

  constructor(public resource: ResourceService, private cdr: ChangeDetectorRef, private logger: LoggerService) {
    // make random pagination ID to avoid situation when we have more than 1 table at page
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  ngOnInit() {
    if (this.configuration) {
      ConfigService.config = this.configuration;
    }
    this.config = ConfigService.config;
    this.limit = this.configuration.rows;
    if (this.groupRowsBy) {
      Observable.from(this.data)
        .groupBy(row => row[this.groupRowsBy])
        .flatMap(group => group.reduce((acc: Array<Object>, curr) => [...acc, curr], []))
        .subscribe(row => this.grouped.push(row));
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const data: SimpleChange = changes.data;
    const pagination: SimpleChange = changes.pagination;
    if (data && data.currentValue) {
      this.data = [...data.currentValue];
    }
    if (pagination && pagination.currentValue) {
      this.count = pagination.currentValue.count;
    }
    if (this.groupRowsBy) {
      Observable.from(this.data)
        .groupBy(row => row[this.groupRowsBy])
        .flatMap(group => group.reduce((acc: Array<Object>, curr) => [...acc, curr], []))
        .subscribe(row => this.grouped.push(row));
    }
  }

  orderBy(key: string): void {
    if (!ConfigService.config.orderEnabled) {
      return;
    }
    if (!ConfigService.config.serverPagination) {
      this.data = this.resource.sortBy(key);
      this.data = [...this.data];
    }
    this.onOrder(key);
  }

  clickedCell($event: object, row: object, key: string | number | boolean, colIndex: number, rowIndex: number): void {
    if (ConfigService.config.selectRow) {
      this.selectedRow = rowIndex;
    }
    if (ConfigService.config.selectCol) {
      this.selectedCol = colIndex;
    }
    if (ConfigService.config.selectCell) {
      this.selectedRow = rowIndex;
      this.selectedCol = colIndex;
    }
    if (ConfigService.config.clickEvent) {
      const value = {
        event: $event,
        row: row,
        key: key,
        rowId: rowIndex,
        colId: colIndex
      };
      this.emitEvent(Event.onClick, value);
    }
  }

  toggleColumn(colIndex): void {
    const toggleColumns = new Set(this.columns);
    if (toggleColumns.has(colIndex)) {
      toggleColumns.delete(colIndex);
    } else {
      toggleColumns.add(colIndex);
    }
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

  onOrder(key): void {
    const value = {
      key,
      order: this.resource.order[key]
    };
    this.emitEvent(Event.onOrder, value);
  }

  private emitEvent(event, value: Object): void {
    this.logger.info(`event: ${Event[event]}; value: ${JSON.stringify(value)}`);
    this.event.emit({ event: Event[event], value });
  }

  selectRowId(rowIndex): void {
    if (this.selectedDetailsTemplateRowId === rowIndex) {
      this.selectedDetailsTemplateRowId = null;
    } else {
      this.selectedDetailsTemplateRowId = rowIndex;
    }
  }
}
