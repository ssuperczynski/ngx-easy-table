import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent  {
  public configuration: Config;
  public columns: Columns[];

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

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
  }
}
`;

  public readonly angularJsonCode = `
"styles": [
  "node_modules/ngx-easy-table/style.css"
],
`;
  public readonly styleScssCode = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');
@import "~ngx-easy-table/style.scss";
`;
  public readonly tableFontCode = `:host ::ng-deep #table {
  font-family: 'Montserrat', sans-serif;
}
`;
}
