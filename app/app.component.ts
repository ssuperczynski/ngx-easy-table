import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/map';


import {SearchPipe} from "./pipes/header-pipe";
import {PaginationPipe} from "./pipes/pagination-pipe";
import {GlobalSearchPipe} from "./pipes/global-search-pipe";

import {FiltersService} from "./services/filters-service";
import {ConfigService} from "./services/config-service";
import {ResourceService} from "./services/resource-service";
import {HttpService} from "./services/http-service";

import {GlobalSearch} from "./components/global-search/global-search.component";
import {CsvExport} from "./components/dropdown/csv-export.component";
import {Header} from "./components/header/header.component";
import {Pagination} from "./components/pagination/pagination.component";

@Component({
  selector: 'ng2-table',

  directives: [Header, Pagination, GlobalSearch, CsvExport],
  pipes: [SearchPipe, PaginationPipe, GlobalSearchPipe],
  template: `
  <global-search
        *ngIf="config.globalSearchEnabled"
        (globalUpdate)="globalSearchTerm = $event">
</global-search>
<csv-export *ngIf="config.exportEnabled"></csv-export>

<table class="ng2-table__table--striped">
    <thead>
    <tr>
        <th [style.display]="config.orderEnabled?'':'none' "
            *ngFor="let key of keys"
            (click)="orderBy(key)">
            {{ key }}
            <span *ngIf="resource.order[key]==='asc' " class="ng2-table__sort-indicator ng2-table__sort-indicator--down"></span>
            <span *ngIf="resource.order[key]==='desc' " class="ng2-table__sort-indicator ng2-table__sort-indicator--up"></span>
        </th>
        <th [style.display]="!config.orderEnabled?'':'none' "
            *ngFor="let key of keys">
            {{ key }}
        </th>
        <th *ngIf="config.editEnabled">Actions</th>
    </tr>
    <tr *ngIf="config.searchEnabled">
        <th *ngFor="let key of keys">
            <table-header (update)="term = $event" [key]="key"></table-header>
        </th>
        <th *ngIf="config.editEnabled"></th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let row of data | search : term | global : globalSearchTerm | pagination : range">
        <td *ngFor="let key of keys">
            {{ row[key] }}
        </td>
        <td *ngIf="config.editEnabled">
            <button class="ng2-table__button">Edit</button>
        </td>
    </tr>
    </tbody>
    <tfoot *ngIf="config.footerEnabled">
    <tr>
        <td *ngFor="let key of keys"></td>
        <td></td>
    </tr>
    </tfoot>
</table>

<pagination *ngIf="config.paginationEnabled" 
            [numberOfItems]="numberOfItems" 
            (updateRange)="range = $event"></pagination>
  `,
  styleUrls: ['app/styles/main.css'],
  encapsulation: ViewEncapsulation.None,

})

export class AppComponent implements OnInit {
  @Input() configuration:ConfigService;

  constructor(public filtersService:FiltersService,
              public config:ConfigService,
              public resource:ResourceService,
              public httpService:HttpService) {
  }

  ngOnInit() {
    if (this.configuration) {
      this.config = this.configuration;
    }
    this.numberOfItems = 0;
    this.itemsObservables = this.httpService.getData(this.config.resourceUrl);
    this.itemsObservables.subscribe(res => {
      this.data = res;
      this.numberOfItems = res.length;
      this.keys = Object.keys(this.data[0]);
      this.resource.keys = this.keys;
    });
  }

  public data:Array<any>;
  public keys:Array<any>;
  public numberOfItems:number;
  public itemsObservables;

  public orderBy(key:string) {
    this.data = this.resource.sortBy(key);
  };
}
