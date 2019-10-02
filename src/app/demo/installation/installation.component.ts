import { Component } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css'],
})
export class InstallationComponent {
  public readonly npmInstallCode = `
npm install ngx-easy-table --save
npm install @angular/cdk --save
`;
  public readonly appModuleCode = `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableModule } from 'ngx-easy-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
`;
  public readonly appComponentHtmlCode = `
<ngx-table [configuration]="configuration"
           [data]="data"
           [columns]="columns">
</ngx-table>
`;
  public readonly appComponentTsCode = `
import { Component } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ConfigurationService],
})
export class AppComponent  {
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  public data = [{
    phone: '+1 (934) 551-2224',
    age: 20,
    address: { street: 'North street', number: 12 },
    company: 'ZILLANET',
    name: 'Valentine Webb',
    isActive: false,
  }, {
    phone: '+1 (948) 460-3627',
    age: 31,
    address: { street: 'South street', number: 12 },
    company: 'KNOWLYSIS',
    name: 'Heidi Duncan',
    isActive: true,
  }];

  // version 9.1 and below
  ngOnInit(): void {
    this.configuration = ConfigurationService.config;
    this.data = data;
  }

  // since version 9.2 you can skip injecting ConfigService
  // instead just do like below (you can still use previous version)
  // this one is just shorter, produces less code and is easier, especially when you have many tables in the project
  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.orderEnabled = false;
    // ... etc.
    this.data = data;
  }
}
`;

  public readonly appComponentServiceCode = `
import { Injectable } from '@angular/core';
import { Config } from 'ngx-easy-table';

@Injectable()
export class ConfigurationService {
  public static config: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
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
    resizeColumn: true,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    threeWaySort: false,
    tableLayout: {
      style: STYLE.NORMAL, // or STYLE.BIG or STYLE.TINY
      theme: THEME.LIGHT, // or THEME.DARK
      borderless: true,
      hover: true,
      striped: false,
    }
  };
}
`;

  public readonly angularJsonCode = `
"styles": [
  "node_modules/ngx-easy-table/style.css",
  "node_modules/typeface-montserrat/index.css",
],
`;
  public readonly styleScssCode = `
@import "~ngx-easy-table/style.scss";
`;
  public readonly tableFontCode = `:host ::ng-deep #table {
  font-family: 'Montserrat', sans-serif;
}
`;
}
