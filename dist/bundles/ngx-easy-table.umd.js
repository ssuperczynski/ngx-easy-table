(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable'), require('rxjs/add/observable/from'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/operator/reduce'), require('rxjs/add/operator/groupBy'), require('@angular/common'), require('ngx-pagination')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable', 'rxjs/add/observable/from', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/reduce', 'rxjs/add/operator/groupBy', '@angular/common', 'ngx-pagination'], factory) :
	(factory((global['ngx-easy-table'] = {}),global.ng.core,global.Rx,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.ng.common,global.ngxPagination));
}(this, (function (exports,core,Observable,from,mergeMap,reduce,groupBy,common,ngxPagination) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */










function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var ResourceService = /** @class */ (function () {
    function ResourceService() {
        this.data = [];
        this.order = [];
    }
    ResourceService.prototype.sortBy = function (key) {
        var _this = this;
        this.key = key;
        if (Object.keys(this.order).length === 0) {
            this.order[this.key] = 'asc';
        }
        if (this.order[this.key] === 'asc') {
            this.order = [];
            this.order[this.key] = 'desc';
            this.data.sort(function (a, b) { return _this.compare(a, b); });
        }
        else {
            this.order = [];
            this.order[this.key] = 'asc';
            this.data.sort(function (a, b) { return _this.compare(b, a); });
        }
        return this.data;
    };
    ResourceService.prototype.compare = function (a, b) {
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
    };
    return ResourceService;
}());
ResourceService.decorators = [
    { type: core.Injectable },
];
ResourceService.ctorParameters = function () { return []; };
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    return ConfigService;
}());
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
    { type: core.Injectable },
];
ConfigService.ctorParameters = function () { return []; };
var Event = {
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
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.error = function (message) {
        console.error(message);
    };
    LoggerService.prototype.warn = function (message) {
        console.warn(message);
    };
    LoggerService.prototype.info = function (message) {
        console.log(message);
    };
    LoggerService.prototype.debug = function (message) {
        console.log(message);
    };
    LoggerService.prototype.log = function (message) {
        console.log(message);
    };
    return LoggerService;
}());
LoggerService.decorators = [
    { type: core.Injectable },
];
LoggerService.ctorParameters = function () { return []; };
var BaseComponent = /** @class */ (function () {
    function BaseComponent(resource, cdr, logger) {
        this.resource = resource;
        this.cdr = cdr;
        this.logger = logger;
        this.grouped = [];
        this.menuActive = false;
        this.page = 1;
        this.count = null;
        this.selectedDetailsTemplateRowId = null;
        this.event = new core.EventEmitter();
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    BaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.configuration) {
            ConfigService.config = this.configuration;
        }
        this.config = ConfigService.config;
        this.limit = this.configuration.rows;
        if (this.groupRowsBy) {
            Observable.Observable.from(this.data)
                .groupBy(function (row) { return row[_this.groupRowsBy]; })
                .flatMap(function (group) { return group.reduce(function (acc, curr) { return __spread(acc, [curr]); }, []); })
                .subscribe(function (row) { return _this.grouped.push(row); });
        }
    };
    BaseComponent.prototype.ngAfterViewInit = function () {
        this.cdr.detectChanges();
    };
    BaseComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var data = changes["data"];
        var pagination = changes["pagination"];
        if (data && data.currentValue) {
            this.data = __spread(data.currentValue);
        }
        if (pagination && pagination.currentValue) {
            this.count = pagination.currentValue.count;
        }
        if (this.groupRowsBy) {
            Observable.Observable.from(this.data)
                .groupBy(function (row) { return row[_this.groupRowsBy]; })
                .flatMap(function (group) { return group.reduce(function (acc, curr) { return __spread(acc, [curr]); }, []); })
                .subscribe(function (row) { return _this.grouped.push(row); });
        }
    };
    BaseComponent.prototype.orderBy = function (key) {
        if (!ConfigService.config.orderEnabled) {
            return;
        }
        if (!ConfigService.config.serverPagination) {
            this.data = this.resource.sortBy(key);
            this.data = __spread(this.data);
        }
        this.onOrder(key);
    };
    BaseComponent.prototype.clickedCell = function ($event, row, key, colIndex, rowIndex) {
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
            var value = {
                event: $event,
                row: row,
                key: key,
                rowId: rowIndex,
                colId: colIndex
            };
            this.emitEvent(Event.onClick, value);
        }
    };
    BaseComponent.prototype.toggleColumn = function (colIndex) {
        var toggleColumns = new Set(this.columns);
        if (toggleColumns.has(colIndex)) {
            toggleColumns.delete(colIndex);
        }
        else {
            toggleColumns.add(colIndex);
        }
    };
    BaseComponent.prototype.onSearch = function ($event) {
        if (!ConfigService.config.serverPagination) {
            this.term = $event;
        }
        this.emitEvent(Event.onSearch, $event);
    };
    BaseComponent.prototype.onGlobalSearch = function ($event) {
        if (!ConfigService.config.serverPagination) {
            this.globalSearchTerm = $event;
        }
        this.emitEvent(Event.onGlobalSearch, $event);
    };
    BaseComponent.prototype.onPagination = function ($event) {
        this.page = $event.page;
        this.limit = $event.limit;
        this.emitEvent(Event.onPagination, $event);
    };
    BaseComponent.prototype.onOrder = function (key) {
        var value = {
            key: key,
            order: this.resource.order[key]
        };
        this.emitEvent(Event.onOrder, value);
    };
    BaseComponent.prototype.emitEvent = function (event, value) {
        this.logger.info("event: " + Event[event] + "; value: " + JSON.stringify(value));
        this.event.emit({ event: Event[event], value: value });
    };
    BaseComponent.prototype.selectRowId = function (rowIndex) {
        if (this.selectedDetailsTemplateRowId === rowIndex) {
            this.selectedDetailsTemplateRowId = null;
        }
        else {
            this.selectedDetailsTemplateRowId = rowIndex;
        }
    };
    return BaseComponent;
}());
BaseComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ngx-table',
                providers: [ResourceService, LoggerService, ConfigService],
                template: "<div class=\"ngx-container\">\n  <div class=\"ngx-columns\">\n    <div class=\"ngx-column ngx-col-4 ngx-col-mr-auto\"></div>\n    <div class=\"ngx-column ngx-col-3\">\n      <global-search\n        *ngIf=\"config.globalSearchEnabled\"\n        (globalUpdate)=\"onGlobalSearch($event)\">\n      </global-search>\n    </div>\n  </div>\n  <div class=\"ngx-columns\">\n    <table class=\"ngx-table ngx-table-striped ngx-table-hover\">\n      <thead>\n      <tr class=\"ngx-table__header\" *ngIf=\"config.headerEnabled\">\n        <ng-container *ngFor=\"let column of columns\">\n          <th class=\"ngx-table__header-cell\"\n              (click)=\"orderBy(column['key'])\">\n            <div class=\"ngx-d-inline\">{{ column['title'] }}</div>\n            <span *ngIf=\"resource.order[column['key']]==='asc' \"\n                  [style.display]=\"config.orderEnabled?'':'none' \"\n                  class=\"ngx-icon ngx-icon-arrow-up\">\n            </span>\n            <span *ngIf=\"resource.order[column['key']]==='desc' \"\n                  [style.display]=\"config.orderEnabled?'':'none' \"\n                  class=\"ngx-icon ngx-icon-arrow-down\">\n            </span>\n          </th>\n        </ng-container>\n        <th *ngIf=\"config.additionalActions || config.detailsTemplate\"\n            class=\"ngx-table__header-cell-additional-actions\">\n          <div class=\"ngx-dropdown ngx-active ngx-dropdown-right\"\n               *ngIf=\"config.additionalActions\"\n               [class.ngx-active]=\"menuActive\">\n            <a class=\"ngx-btn ngx-btn-link\" (click)=\"menuActive = !menuActive\">\n              <span class=\"ngx-icon ngx-icon-menu\"></span>\n            </a>\n            <ul class=\"ngx-menu ngx-table__table-menu\">\n              <li class=\"ngx-menu-item\">\n                <csv-export *ngIf=\"config.exportEnabled\"></csv-export>\n              </li>\n            </ul>\n          </div>\n        </th>\n      </tr>\n      <tr *ngIf=\"config.searchEnabled\"\n          class=\"ngx-table__sortHeader\">\n        <ng-container *ngFor=\"let column of columns\">\n          <th>\n            <table-header (update)=\"onSearch($event)\" [column]=\"column\"></table-header>\n          </th>\n        </ng-container>\n        <th *ngIf=\"config.additionalActions || config.detailsTemplate\"></th>\n      </tr>\n      </thead>\n      <tbody *ngIf=\"data && !config.isLoading\">\n      <ng-container *ngIf=\"rowTemplate\">\n        <tr *ngFor=\"let row of data | search : term | global : globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n              let rowIndex = index\"\n            (click)=\"clickedCell($event, row, '', '', rowIndex)\"\n            [class.ngx-table__table-row--selected]=\"rowIndex == selectedRow && !config.selectCell\">\n          <ng-container [ngTemplateOutlet]=\"rowTemplate\"\n                        [ngTemplateOutletContext]=\"{ $implicit: row }\">\n          </ng-container>\n        </tr>\n      </ng-container>\n      <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n        <ng-container\n          *ngFor=\"let row of data | search : term | global : globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n                  let rowIndex = index\"\n          [class.ngx-table__table-row--selected]=\"rowIndex == selectedRow && !config.selectCell\">\n          <tr>\n            <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n              <td (click)=\"clickedCell($event, row, column['key'], colIndex, rowIndex)\"\n                  [class.ngx-table__table-col--selected]=\"colIndex == selectedCol && !config.selectCell\"\n                  [class.ngx-table__table-cell--selected]=\"colIndex == selectedCol && rowIndex == selectedRow && !config.selectCol && !config.selectRow\"\n              >\n                <div>{{ row[column['key']] }}</div>\n              </td>\n            </ng-container>\n            <td *ngIf=\"config.additionalActions || config.detailsTemplate\">\n              <span class=\"ngx-icon ngx-c-hand\"\n                    [class.ngx-icon-arrow-down]=\"selectedDetailsTemplateRowId === rowIndex\"\n                    [class.ngx-icon-arrow-right]=\"selectedDetailsTemplateRowId !== rowIndex\"\n                    (click)=\"selectRowId(rowIndex)\">\n              </span>\n            </td>\n          </tr>\n          <tr *ngIf=\"config.detailsTemplate && selectedDetailsTemplateRowId === rowIndex\">\n            <td [attr.colspan]=\"columns.length + 1\">\n              <ng-container\n                [ngTemplateOutlet]=\"detailsTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: row }\">\n              </ng-container>\n            </td>\n          </tr>\n        </ng-container>\n      </ng-container>\n      <ng-container *ngIf=\"!rowTemplate && config.groupRows\">\n        <ng-container\n          *ngFor=\"let group of grouped; let rowIndex = index\">\n          <tr>\n            <td [attr.colspan]=\"columns.length\">\n              <div>{{group[0][groupRowsBy]}} ({{group.length}})</div>\n            </td>\n            <td>\n              <span class=\"ngx-icon ngx-c-hand\"\n                    [class.ngx-icon-arrow-down]=\"selectedDetailsTemplateRowId === rowIndex\"\n                    [class.ngx-icon-arrow-right]=\"selectedDetailsTemplateRowId !== rowIndex\"\n                    (click)=\"selectRowId(rowIndex)\">\n              </span>\n            </td>\n          </tr>\n          <ng-container *ngIf=\"selectedDetailsTemplateRowId === rowIndex\">\n            <tr *ngFor=\"let row of group\">\n              <td *ngFor=\"let column of columns\">\n                {{row[column['key']]}}\n                <!-- TODO allow users to add groupRowsTemplateRef -->\n              </td>\n              <td></td>\n            </tr>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n      </tbody>\n      <tbody *ngIf=\"!data\">\n      <tr class=\"ngx-table__body-empty\">\n        <td>{{'- Geen Resultaten -'}}</td>\n      </tr>\n      </tbody>\n      <tbody *ngIf=\"config.isLoading\">\n      <tr class=\"ngx-table__body-loading\">\n        <td>\n          <div class=\"ngx-table__table-loader\"></div>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <pagination\n    *ngIf=\"config.paginationEnabled\"\n    [id]=\"id\"\n    [pagination]=\"pagination\"\n    (updateRange)=\"onPagination($event)\">\n  </pagination>\n</div>\n",
                styles: ["*{font-family:Verdana,serif}.ngx-table__table-cell--selected,.ngx-table__table-col--selected,.ngx-table__table-row--selected{background:#9cbff9!important}.ngx-table__table-loader{border:4px solid #f3f3f3;border-top:4px solid #3498db;border-radius:50%;height:20px;width:20px;margin-left:auto;margin-right:auto;-webkit-animation:1s linear infinite spin;animation:1s linear infinite spin}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
BaseComponent.ctorParameters = function () { return [
    { type: ResourceService, },
    { type: core.ChangeDetectorRef, },
    { type: LoggerService, },
]; };
BaseComponent.propDecorators = {
    "configuration": [{ type: core.Input },],
    "data": [{ type: core.Input },],
    "pagination": [{ type: core.Input },],
    "groupRowsBy": [{ type: core.Input },],
    "detailsTemplate": [{ type: core.Input },],
    "columns": [{ type: core.Input },],
    "event": [{ type: core.Output },],
    "rowTemplate": [{ type: core.ContentChild, args: [core.TemplateRef,] },],
};
var GlobalSearchComponent = /** @class */ (function () {
    function GlobalSearchComponent() {
        this.globalUpdate = new core.EventEmitter();
    }
    return GlobalSearchComponent;
}());
GlobalSearchComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'global-search',
                template: "<label class=\"form-label ngx-float-right\" for=\"search\">\n  <input type=\"text\"\n         id=\"search\"\n         class=\"ngx-table__global-search ngx-form-input ngx-input-sm\"\n         #input\n         (input)=\"globalUpdate.emit({value: input.value})\"\n         placeholder=\"Search\"/>\n</label>\n"
            },] },
];
GlobalSearchComponent.ctorParameters = function () { return []; };
GlobalSearchComponent.propDecorators = {
    "globalUpdate": [{ type: core.Output },],
};
var GlobalSearchPipe = /** @class */ (function () {
    function GlobalSearchPipe(resource) {
        this.resource = resource;
    }
    GlobalSearchPipe.prototype.transform = function (dataArr, filter) {
        var _this = this;
        if (typeof dataArr === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined' || Object.keys(filter).length === 0 || filter === '') {
            return dataArr;
        }
        this.resource.data = [];
        dataArr.forEach(function (row) {
            for (var value in row) {
                if (row.hasOwnProperty(value)) {
                    var element = void 0;
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
                        _this.resource.data.push(row);
                        return;
                    }
                }
            }
        });
        return this.resource.data;
    };
    return GlobalSearchPipe;
}());
GlobalSearchPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'global'
            },] },
];
GlobalSearchPipe.ctorParameters = function () { return [
    { type: ResourceService, },
]; };
var SearchPipe = /** @class */ (function () {
    function SearchPipe(resource) {
        this.resource = resource;
    }
    SearchPipe.prototype.transform = function (value, filters) {
        var _this = this;
        if (typeof value === 'undefined') {
            return;
        }
        this.resource.data = value.slice();
        if (typeof filters === 'undefined' || Object.keys(filters).length === 0) {
            return this.resource.data;
        }
        var filtersArr = [];
        filtersArr[filters.key] = filters.value;
        value.forEach(function (item) {
            for (var filterKey in filtersArr) {
                if (filtersArr.hasOwnProperty(filterKey)) {
                    var element = '';
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
                        _this.resource.data.splice(_this.resource.data.indexOf(item), 1);
                        return;
                    }
                }
            }
        });
        return this.resource.data;
    };
    return SearchPipe;
}());
SearchPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'search'
            },] },
];
SearchPipe.ctorParameters = function () { return [
    { type: ResourceService, },
]; };
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.update = new core.EventEmitter();
    }
    return HeaderComponent;
}());
HeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'table-header',
                template: "\n    <label for=\"search_{{ column['key'] }}\">\n      <div class=\"input-group mb-3  pt-3\">\n        <span class=\"input-group-addon\"><i _ngcontent-c3=\"\" class=\"fa fa-search\"></i></span>\n        <input type=\"text\"\n               id=\"search_{{ column['key'] }}\"\n               aria-label=\"Zoek\"\n               placeholder=\"Zoek: {{ column['title'] }}\"\n               class=\"ngx-table__header-search ngx-form-input ngx-input-sm form-control\"\n               #input\n               (input)=\"update.emit({value: input.value, key: column['key']})\">\n      </div>\n    </label>"
            },] },
];
HeaderComponent.ctorParameters = function () { return []; };
HeaderComponent.propDecorators = {
    "column": [{ type: core.Input },],
    "update": [{ type: core.Output },],
};
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.updateRange = new core.EventEmitter();
        this.ranges = [5, 10, 25, 50, 100];
        this.limit = ConfigService.config.rows;
        this.showRange = false;
    }
    PaginationComponent.prototype.onPageChange = function ($event) {
        this.updateRange.emit({
            page: $event,
            limit: this.limit
        });
    };
    PaginationComponent.prototype.changeLimit = function (limit) {
        this.showRange = !this.showRange;
        this.limit = limit;
        this.updateRange.emit({
            page: 1,
            limit: limit
        });
    };
    PaginationComponent.prototype.ngOnInit = function () {
        this.config = ConfigService.config;
    };
    return PaginationComponent;
}());
PaginationComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'pagination',
                template: "<div class=\"ngx-columns\">\n  <div class=\"ngx-col-mr-auto pagination-mobile\">\n    <pagination-controls\n      [id]=\"id\"\n      [maxSize]=\"5\"\n      [previousLabel]=\"''\"\n      [nextLabel]=\"''\"\n      (pageChange)=\"onPageChange($event)\">\n    </pagination-controls>\n  </div>\n  <div class=\"pagination-mobile\" *ngIf=\"config.paginationRangeEnabled\">\n    <div class=\"ngx-dropdown ngx-range-dropdown ngx-float-right\"\n         [class.ngx-active]=\"showRange\"\n         id=\"rowAmount\">\n      <div class=\"ngx-btn-group\">\n        <div class=\"ngx-btn ngx-range-dropdown-button\"\n              (click)=\"showRange = !showRange\">\n          {{limit}} <i class=\"ngx-icon ngx-icon-arrow-down\"></i>\n        </div>\n        <ul class=\"ngx-menu\">\n          <li class=\"ngx-c-hand ngx-range-dropdown-button\"\n              (click)=\"changeLimit(limit)\"\n              *ngFor=\"let limit of ranges\">\n            <span>{{limit}}</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [":host /deep/ pagination-controls>pagination-template>ul>li{border:1px solid #f0f0f0}.ngx-btn{color:#4f596c;border:1px solid #f0f0f0}.ngx-range-dropdown{margin-top:8px;margin-right:2px}.ngx-range-dropdown-button{padding:4px}.ngx-menu{min-width:55px}@media screen and (max-width:480px){.pagination-mobile{margin-right:auto;margin-left:auto}}"],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
PaginationComponent.ctorParameters = function () { return []; };
PaginationComponent.propDecorators = {
    "pagination": [{ type: core.Input },],
    "id": [{ type: core.Input },],
    "updateRange": [{ type: core.Output },],
};
var CsvExportComponent = /** @class */ (function () {
    function CsvExportComponent(resource) {
        this.resource = resource;
    }
    CsvExportComponent.prototype.exportCsv = function () {
        var data = this.resource.data;
        var csvContent = 'data:text/csv;charset=utf-8,';
        var dataString = '';
        var x = [];
        var keys = Object.keys(this.resource.data[0]);
        data.forEach(function (row, index) {
            x[index] = [];
            keys.forEach(function (i) {
                if (row.hasOwnProperty(i)) {
                    if (typeof row[i] === 'object') {
                        row[i] = 'Object';
                    }
                    x[index].push(row[i]);
                }
            });
        });
        csvContent += keys + '\n';
        x.forEach(function (row, index) {
            dataString = row.join(',');
            csvContent += index < data.length ? dataString + '\n' : dataString;
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'my_data.csv');
        link.click();
    };
    return CsvExportComponent;
}());
CsvExportComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'csv-export',
                template: "\n    <a (click)=\"exportCsv()\">\n      CSV export\n    </a>"
            },] },
];
CsvExportComponent.ctorParameters = function () { return [
    { type: ResourceService, },
]; };
var BaseModule = /** @class */ (function () {
    function BaseModule() {
    }
    return BaseModule;
}());
BaseModule.decorators = [
    { type: core.NgModule, args: [{
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
                    common.CommonModule,
                    ngxPagination.NgxPaginationModule
                ],
                exports: [BaseComponent]
            },] },
];
BaseModule.ctorParameters = function () { return []; };
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    return TableModule;
}());
TableModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    BaseModule,
                ],
                bootstrap: [BaseComponent],
                exports: [BaseComponent],
                providers: []
            },] },
];
TableModule.ctorParameters = function () { return []; };

exports.TableModule = TableModule;
exports.ɵb = BaseComponent;
exports.ɵa = BaseModule;
exports.ɵg = CsvExportComponent;
exports.ɵf = GlobalSearchComponent;
exports.ɵh = HeaderComponent;
exports.ɵi = PaginationComponent;
exports.ɵk = GlobalSearchPipe;
exports.ɵj = SearchPipe;
exports.ɵe = ConfigService;
exports.ɵd = LoggerService;
exports.ɵc = ResourceService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-easy-table.umd.js.map
