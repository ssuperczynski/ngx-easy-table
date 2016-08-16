import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpModule}     from '@angular/http';

import {HTTP_PROVIDERS}   from "@angular/http";
import {HttpService}      from "./services/http-service";
import {FiltersService}   from "./services/filters-service";
import {ResourceService}  from "./services/resource-service";
import {ConfigService}    from "./services/config-service";

import {AppComponent}   from './app.component';
import {GlobalSearch}   from "./components/global-search/global-search.component";
import {CsvExport}      from "./components/dropdown/csv-export.component";
import {Header}         from "./components/header/header.component";
import {Pagination}     from "./components/pagination/pagination.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    GlobalSearch,
    CsvExport,
    Header,
    Pagination
  ],
  providers: [HttpService, FiltersService, ResourceService, ConfigService, HTTP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}