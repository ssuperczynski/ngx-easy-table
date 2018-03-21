import { Injectable, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, Pipe, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/groupBy';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResourceService {
    constructor() {
        this.data = [];
        this.order = [];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    sortBy(key) {
        this.key = key;
        if (Object.keys(this.order).length === 0) {
            this.order[this.key] = 'asc';
        }
        if (this.order[this.key] === 'asc') {
            this.order = [];
            this.order[this.key] = 'desc';
            this.data.sort((a, b) => this.compare(a, b));
        }
        else {
            this.order = [];
            this.order[this.key] = 'asc';
            this.data.sort((a, b) => this.compare(b, a));
        }
        return this.data;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compare(a, b) {
        if ((isNaN(parseFloat(a[this.key])) || !isFinite(a[this.key])) || (isNaN(parseFloat(b[this.key])) || !isFinite(b[this.key]))) {
            if (a[this.key] + ''.toLowerCase() < b[this.key] + ''.toLowerCase()) {
                return -1;
            }
            if (a[this.key] + ''.toLowerCase() > b[this.key] + ''.toLowerCase()) {
                return 1;
            }
        }
        else {
            if (parseFloat(a[this.key]) < parseFloat(b[this.key])) {
                return -1;
            }
            if (parseFloat(a[this.key]) > parseFloat(b[this.key])) {
                return 1;
            }
        }
        return 0;
    }
}
ResourceService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ResourceService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ConfigService {
}
ConfigService.config = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: true,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: true,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
};
ConfigService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConfigService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const Event = {
    onPagination: 0,
    onOrder: 1,
    onGlobalSearch: 2,
    onSearch: 3,
    onClick: 4,
};
Event[Event.onPagination] = "onPagination";
Event[Event.onOrder] = "onOrder";
Event[Event.onGlobalSearch] = "onGlobalSearch";
Event[Event.onSearch] = "onSearch";
Event[Event.onClick] = "onClick";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LoggerService {
    /**
     * @param {?=} message
     * @return {?}
     */
    error(message) {
        console.error(message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    warn(message) {
        console.warn(message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    info(message) {
        console.log(message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    debug(message) {
        console.log(message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    log(message) {
        console.log(message);
    }
}
LoggerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LoggerService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BaseComponent {
    /**
     * @param {?} resource
     * @param {?} cdr
     * @param {?} logger
     */
    constructor(resource, cdr, logger) {
        this.resource = resource;
        this.cdr = cdr;
        this.logger = logger;
        this.grouped = [];
        this.menuActive = false;
        this.page = 1;
        this.count = null;
        this.selectedDetailsTemplateRowId = null;
        this.event = new EventEmitter();
        // make random pagination ID to avoid situation when we have more than 1 table at page
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.configuration) {
            ConfigService.config = this.configuration;
        }
        this.config = ConfigService.config;
        this.limit = this.configuration.rows;
        if (this.groupRowsBy) {
            Observable.from(this.data)
                .groupBy(row => row[this.groupRowsBy])
                .flatMap(group => group.reduce((acc, curr) => [...acc, curr], []))
                .subscribe(row => this.grouped.push(row));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ data = changes["data"];
        const /** @type {?} */ pagination = changes["pagination"];
        if (data && data.currentValue) {
            this.data = [...data.currentValue];
        }
        if (pagination && pagination.currentValue) {
            this.count = pagination.currentValue.count;
        }
        if (this.groupRowsBy) {
            Observable.from(this.data)
                .groupBy(row => row[this.groupRowsBy])
                .flatMap(group => group.reduce((acc, curr) => [...acc, curr], []))
                .subscribe(row => this.grouped.push(row));
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    orderBy(key) {
        if (!ConfigService.config.orderEnabled) {
            return;
        }
        if (!ConfigService.config.serverPagination) {
            this.data = this.resource.sortBy(key);
            this.data = [...this.data];
        }
        this.onOrder(key);
    }
    /**
     * @param {?} $event
     * @param {?} row
     * @param {?} key
     * @param {?} colIndex
     * @param {?} rowIndex
     * @return {?}
     */
    clickedCell($event, row, key, colIndex, rowIndex) {
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
            const /** @type {?} */ value = {
                event: $event,
                row: row,
                key: key,
                rowId: rowIndex,
                colId: colIndex
            };
            this.emitEvent(Event.onClick, value);
        }
    }
    /**
     * @param {?} colIndex
     * @return {?}
     */
    toggleColumn(colIndex) {
        const /** @type {?} */ toggleColumns = new Set(this.columns);
        if (toggleColumns.has(colIndex)) {
            toggleColumns.delete(colIndex);
        }
        else {
            toggleColumns.add(colIndex);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSearch($event) {
        if (!ConfigService.config.serverPagination) {
            this.term = $event;
        }
        this.emitEvent(Event.onSearch, $event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onGlobalSearch($event) {
        if (!ConfigService.config.serverPagination) {
            this.globalSearchTerm = $event;
        }
        this.emitEvent(Event.onGlobalSearch, $event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPagination($event) {
        this.page = $event.page;
        this.limit = $event.limit;
        this.emitEvent(Event.onPagination, $event);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    onOrder(key) {
        const /** @type {?} */ value = {
            key,
            order: this.resource.order[key]
        };
        this.emitEvent(Event.onOrder, value);
    }
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    emitEvent(event, value) {
        this.logger.info(`event: ${Event[event]}; value: ${JSON.stringify(value)}`);
        this.event.emit({ event: Event[event], value });
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    selectRowId(rowIndex) {
        if (this.selectedDetailsTemplateRowId === rowIndex) {
            this.selectedDetailsTemplateRowId = null;
        }
        else {
            this.selectedDetailsTemplateRowId = rowIndex;
        }
    }
}
BaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-table',
                providers: [ResourceService, LoggerService, ConfigService],
                template: `<div class="ngx-container">
  <div class="ngx-columns">
    <div class="ngx-column ngx-col-4 ngx-col-mr-auto"></div>
    <div class="ngx-column ngx-col-3">
      <global-search
        *ngIf="config.globalSearchEnabled"
        (globalUpdate)="onGlobalSearch($event)">
      </global-search>
    </div>
  </div>
  <div class="ngx-columns">
    <table class="ngx-table ngx-table-striped ngx-table-hover">
      <thead>
      <tr class="ngx-table__header" *ngIf="config.headerEnabled">
        <ng-container *ngFor="let column of columns">
          <th class="ngx-table__header-cell"
              (click)="orderBy(column['key'])">
            <div class="ngx-d-inline">{{ column['title'] }}</div>
            <span *ngIf="resource.order[column['key']]==='asc' "
                  [style.display]="config.orderEnabled?'':'none' "
                  class="ngx-icon ngx-icon-arrow-up">
            </span>
            <span *ngIf="resource.order[column['key']]==='desc' "
                  [style.display]="config.orderEnabled?'':'none' "
                  class="ngx-icon ngx-icon-arrow-down">
            </span>
          </th>
        </ng-container>
        <th *ngIf="config.additionalActions || config.detailsTemplate"
            class="ngx-table__header-cell-additional-actions">
          <div class="ngx-dropdown ngx-active ngx-dropdown-right"
               *ngIf="config.additionalActions"
               [class.ngx-active]="menuActive">
            <a class="ngx-btn ngx-btn-link" (click)="menuActive = !menuActive">
              <span class="ngx-icon ngx-icon-menu"></span>
            </a>
            <ul class="ngx-menu ngx-table__table-menu">
              <li class="ngx-menu-item">
                <csv-export *ngIf="config.exportEnabled"></csv-export>
              </li>
            </ul>
          </div>
        </th>
      </tr>
      <tr *ngIf="config.searchEnabled"
          class="ngx-table__sortHeader">
        <ng-container *ngFor="let column of columns">
          <th>
            <table-header (update)="onSearch($event)" [column]="column"></table-header>
          </th>
        </ng-container>
        <th *ngIf="config.additionalActions || config.detailsTemplate"></th>
      </tr>
      </thead>
      <tbody *ngIf="data && !config.isLoading">
      <ng-container *ngIf="rowTemplate">
        <tr *ngFor="let row of data | search : term | global : globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };
              let rowIndex = index"
            (click)="clickedCell($event, row, '', '', rowIndex)"
            [class.ngx-table__table-row--selected]="rowIndex == selectedRow && !config.selectCell">
          <ng-container [ngTemplateOutlet]="rowTemplate"
                        [ngTemplateOutletContext]="{ $implicit: row }">
          </ng-container>
        </tr>
      </ng-container>
      <ng-container *ngIf="!rowTemplate && !config.groupRows">
        <ng-container
          *ngFor="let row of data | search : term | global : globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };
                  let rowIndex = index"
          [class.ngx-table__table-row--selected]="rowIndex == selectedRow && !config.selectCell">
          <tr>
            <ng-container *ngFor="let column of columns; let colIndex = index">
              <td (click)="clickedCell($event, row, column['key'], colIndex, rowIndex)"
                  [class.ngx-table__table-col--selected]="colIndex == selectedCol && !config.selectCell"
                  [class.ngx-table__table-cell--selected]="colIndex == selectedCol && rowIndex == selectedRow && !config.selectCol && !config.selectRow"
              >
                <div>{{ row[column['key']] }}</div>
              </td>
            </ng-container>
            <td *ngIf="config.additionalActions || config.detailsTemplate">
              <span class="ngx-icon ngx-c-hand"
                    [class.ngx-icon-arrow-down]="selectedDetailsTemplateRowId === rowIndex"
                    [class.ngx-icon-arrow-right]="selectedDetailsTemplateRowId !== rowIndex"
                    (click)="selectRowId(rowIndex)">
              </span>
            </td>
          </tr>
          <tr *ngIf="config.detailsTemplate && selectedDetailsTemplateRowId === rowIndex">
            <td [attr.colspan]="columns.length + 1">
              <ng-container
                [ngTemplateOutlet]="detailsTemplate"
                [ngTemplateOutletContext]="{ $implicit: row }">
              </ng-container>
            </td>
          </tr>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="!rowTemplate && config.groupRows">
        <ng-container
          *ngFor="let group of grouped; let rowIndex = index">
          <tr>
            <td [attr.colspan]="columns.length">
              <div>{{group[0][groupRowsBy]}} ({{group.length}})</div>
            </td>
            <td>
              <span class="ngx-icon ngx-c-hand"
                    [class.ngx-icon-arrow-down]="selectedDetailsTemplateRowId === rowIndex"
                    [class.ngx-icon-arrow-right]="selectedDetailsTemplateRowId !== rowIndex"
                    (click)="selectRowId(rowIndex)">
              </span>
            </td>
          </tr>
          <ng-container *ngIf="selectedDetailsTemplateRowId === rowIndex">
            <tr *ngFor="let row of group">
              <td *ngFor="let column of columns">
                {{row[column['key']]}}
                <!-- TODO allow users to add groupRowsTemplateRef -->
              </td>
              <td></td>
            </tr>
          </ng-container>
        </ng-container>
      </ng-container>
      </tbody>
      <tbody *ngIf="!data">
      <tr class="ngx-table__body-empty">
        <td>No results</td>
      </tr>
      </tbody>
      <tbody *ngIf="config.isLoading">
      <tr class="ngx-table__body-loading">
        <td>
          <div class="ngx-table__table-loader"></div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <pagination
    *ngIf="config.paginationEnabled"
    [id]="id"
    [pagination]="pagination"
    (updateRange)="onPagination($event)">
  </pagination>
</div>
`,
                styles: [`*{font-family:Verdana,serif}.ngx-table__table-cell--selected,.ngx-table__table-col--selected,.ngx-table__table-row--selected{background:#9cbff9!important}.ngx-table__table-loader{border:4px solid #f3f3f3;border-top:4px solid #3498db;border-radius:50%;height:20px;width:20px;margin-left:auto;margin-right:auto;-webkit-animation:1s linear infinite spin;animation:1s linear infinite spin}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
BaseComponent.ctorParameters = () => [
    { type: ResourceService, },
    { type: ChangeDetectorRef, },
    { type: LoggerService, },
];
BaseComponent.propDecorators = {
    "configuration": [{ type: Input },],
    "data": [{ type: Input },],
    "pagination": [{ type: Input },],
    "groupRowsBy": [{ type: Input },],
    "detailsTemplate": [{ type: Input },],
    "columns": [{ type: Input },],
    "event": [{ type: Output },],
    "rowTemplate": [{ type: ContentChild, args: [TemplateRef,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GlobalSearchComponent {
    constructor() {
        this.globalUpdate = new EventEmitter();
    }
}
GlobalSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'global-search',
                template: `<label class="form-label ngx-float-right" for="search">
  <input type="text"
         id="search"
         class="ngx-table__global-search ngx-form-input ngx-input-sm"
         #input
         (input)="globalUpdate.emit({value: input.value})"
         placeholder="Search"/>
</label>
`
            },] },
];
/** @nocollapse */
GlobalSearchComponent.ctorParameters = () => [];
GlobalSearchComponent.propDecorators = {
    "globalUpdate": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GlobalSearchPipe {
    /**
     * @param {?} resource
     */
    constructor(resource) {
        this.resource = resource;
    }
    /**
     * @param {?} dataArr
     * @param {?} filter
     * @return {?}
     */
    transform(dataArr, filter) {
        if (typeof dataArr === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined' || Object.keys(filter).length === 0 || filter === '') {
            return dataArr;
        }
        this.resource.data = [];
        dataArr.forEach((row) => {
            for (const /** @type {?} */ value in row) {
                if (row.hasOwnProperty(value)) {
                    let /** @type {?} */ element;
                    if (typeof row[value] === 'object') {
                        element = JSON.stringify(row[value]).toLocaleLowerCase();
                    }
                    if (typeof row[value] === 'boolean') {
                        element = '' + row[value];
                    }
                    if (typeof row[value] === 'string') {
                        element = row[value].toLocaleLowerCase();
                    }
                    if (typeof row[value] === 'number') {
                        element = '' + row[value];
                    }
                    if (element.indexOf(filter['value'].toLocaleLowerCase()) >= 0) {
                        this.resource.data.push(row);
                        return;
                    }
                }
            }
        });
        return this.resource.data;
    }
}
GlobalSearchPipe.decorators = [
    { type: Pipe, args: [{
                name: 'global'
            },] },
];
/** @nocollapse */
GlobalSearchPipe.ctorParameters = () => [
    { type: ResourceService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchPipe {
    /**
     * @param {?} resource
     */
    constructor(resource) {
        this.resource = resource;
    }
    /**
     * @param {?} value
     * @param {?} filters
     * @return {?}
     */
    transform(value, filters) {
        if (typeof value === 'undefined') {
            return;
        }
        this.resource.data = value.slice();
        if (typeof filters === 'undefined' || Object.keys(filters).length === 0) {
            return this.resource.data;
        }
        const /** @type {?} */ filtersArr = [];
        filtersArr[filters.key] = filters.value;
        value.forEach((item) => {
            for (const /** @type {?} */ filterKey in filtersArr) {
                if (filtersArr.hasOwnProperty(filterKey)) {
                    let /** @type {?} */ element = '';
                    if (typeof item[filterKey] === 'string') {
                        element = item[filterKey].toLocaleLowerCase();
                    }
                    if (typeof item[filterKey] === 'object') {
                        element = JSON.stringify(item[filterKey]);
                    }
                    if (typeof item[filterKey] === 'number') {
                        element = item[filterKey].toString();
                    }
                    if (typeof item[filterKey] === 'boolean') {
                        element = item[filterKey].toString();
                    }
                    if (element.indexOf(filtersArr[filterKey].toLocaleLowerCase()) === -1) {
                        this.resource.data.splice(this.resource.data.indexOf(item), 1);
                        return;
                    }
                }
            }
        });
        return this.resource.data;
    }
}
SearchPipe.decorators = [
    { type: Pipe, args: [{
                name: 'search'
            },] },
];
/** @nocollapse */
SearchPipe.ctorParameters = () => [
    { type: ResourceService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderComponent {
    constructor() {
        this.update = new EventEmitter();
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-header',
                template: `
    <label for="search_{{ column['key'] }}">
      <input type="text"
             id="search_{{ column['key'] }}"
             aria-label="Search"
             placeholder="Search {{ column['title'] }}"
             class="ngx-table__header-search ngx-form-input ngx-input-sm"
             #input
             (input)="update.emit({value: input.value, key: column['key']})"
      >
    </label>`
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];
HeaderComponent.propDecorators = {
    "column": [{ type: Input },],
    "update": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginationComponent {
    constructor() {
        this.updateRange = new EventEmitter();
        this.ranges = [5, 10, 25, 50, 100];
        this.limit = ConfigService.config.rows;
        this.showRange = false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPageChange($event) {
        this.updateRange.emit({
            page: $event,
            limit: this.limit
        });
    }
    /**
     * @param {?} limit
     * @return {?}
     */
    changeLimit(limit) {
        this.showRange = !this.showRange;
        this.limit = limit;
        this.updateRange.emit({
            page: 1,
            limit: limit
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.config = ConfigService.config;
    }
}
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'pagination',
                template: `<div class="ngx-columns">
  <div class="ngx-col-mr-auto pagination-mobile">
    <pagination-controls
      [id]="id"
      [maxSize]="5"
      [previousLabel]="''"
      [nextLabel]="''"
      (pageChange)="onPageChange($event)">
    </pagination-controls>
  </div>
  <div class="pagination-mobile" *ngIf="config.paginationRangeEnabled">
    <div class="ngx-dropdown ngx-range-dropdown ngx-float-right"
         [class.ngx-active]="showRange"
         id="rowAmount">
      <div class="ngx-btn-group">
        <div class="ngx-btn ngx-range-dropdown-button"
              (click)="showRange = !showRange">
          {{limit}} <i class="ngx-icon ngx-icon-arrow-down"></i>
        </div>
        <ul class="ngx-menu">
          <li class="ngx-c-hand ngx-range-dropdown-button"
              (click)="changeLimit(limit)"
              *ngFor="let limit of ranges">
            <span>{{limit}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`:host /deep/ pagination-controls>pagination-template>ul>li{border:1px solid #f0f0f0}.ngx-btn{color:#4f596c;border:1px solid #f0f0f0}.ngx-range-dropdown{margin-top:8px;margin-right:2px}.ngx-range-dropdown-button{padding:4px}.ngx-menu{min-width:55px}@media screen and (max-width:480px){.pagination-mobile{margin-right:auto;margin-left:auto}}`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PaginationComponent.ctorParameters = () => [];
PaginationComponent.propDecorators = {
    "pagination": [{ type: Input },],
    "id": [{ type: Input },],
    "updateRange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CsvExportComponent {
    /**
     * @param {?} resource
     */
    constructor(resource) {
        this.resource = resource;
    }
    /**
     * @return {?}
     */
    exportCsv() {
        const /** @type {?} */ data = this.resource.data;
        let /** @type {?} */ csvContent = 'data:text/csv;charset=utf-8,';
        let /** @type {?} */ dataString = '';
        const /** @type {?} */ x = [];
        const /** @type {?} */ keys = Object.keys(this.resource.data[0]);
        data.forEach((row, index) => {
            x[index] = [];
            keys.forEach((i) => {
                if (row.hasOwnProperty(i)) {
                    if (typeof row[i] === 'object') {
                        row[i] = 'Object'; // so far just change object to "Object" string
                    }
                    x[index].push(row[i]);
                }
            });
        });
        csvContent += keys + '\n';
        x.forEach((row, index) => {
            dataString = row.join(',');
            csvContent += index < data.length ? dataString + '\n' : dataString;
        });
        const /** @type {?} */ encodedUri = encodeURI(csvContent);
        const /** @type {?} */ link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'my_data.csv');
        link.click();
    }
}
CsvExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'csv-export',
                template: `
    <a (click)="exportCsv()">
      CSV export
    </a>`
            },] },
];
/** @nocollapse */
CsvExportComponent.ctorParameters = () => [
    { type: ResourceService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BaseModule {
}
BaseModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BaseComponent,
                    GlobalSearchComponent,
                    CsvExportComponent,
                    HeaderComponent,
                    PaginationComponent,
                    SearchPipe,
                    GlobalSearchPipe
                ],
                imports: [
                    CommonModule,
                    NgxPaginationModule
                ],
                exports: [BaseComponent]
            },] },
];
/** @nocollapse */
BaseModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BaseModule,
                ],
                bootstrap: [BaseComponent],
                exports: [BaseComponent],
                providers: []
            },] },
];
/** @nocollapse */
TableModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { TableModule, BaseComponent as ɵb, BaseModule as ɵa, CsvExportComponent as ɵg, GlobalSearchComponent as ɵf, HeaderComponent as ɵh, PaginationComponent as ɵi, GlobalSearchPipe as ɵk, SearchPipe as ɵj, ConfigService as ɵe, LoggerService as ɵd, ResourceService as ɵc };
//# sourceMappingURL=ngx-easy-table.js.map
