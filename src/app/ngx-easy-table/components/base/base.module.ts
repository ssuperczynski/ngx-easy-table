import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from '@core/ngx-easy-table/components/base/base.component';
import { GlobalSearchComponent } from '@core/ngx-easy-table/components/global-search/global-search.component';
import { GlobalSearchPipe } from '@core/ngx-easy-table/pipes/global-search-pipe';
import { SearchPipe } from '@core/ngx-easy-table/pipes/search-pipe';
import { HeaderComponent } from '@core/ngx-easy-table/components/header/header.component';
import { PaginationComponent } from '@core/ngx-easy-table/components/pagination/pagination.component';
import { CsvExportComponent } from '@core/ngx-easy-table/components/csv-export.component';
import { SortPipe } from '@core/ngx-easy-table/pipes/sort.pipe';
import { RenderPipe } from '@core/ngx-easy-table/pipes/render-pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

@NgModule({
  declarations: [
    BaseComponent,
    GlobalSearchComponent,
    CsvExportComponent,
    HeaderComponent,
    PaginationComponent,
    SearchPipe,
    RenderPipe,
    GlobalSearchPipe,
    SortPipe,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgxDnDModule
  ],
  exports: [BaseComponent]
})
export class BaseModule {
}
