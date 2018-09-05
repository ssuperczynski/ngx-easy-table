import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseComponent } from './base.component';

import { CsvExportComponent } from '../csv-export.component';
import { GlobalSearchComponent } from '../global-search/global-search.component';
import { HeaderComponent } from '../header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';

import { GlobalSearchPipe } from '../../pipes/global-search-pipe';
import { RenderPipe } from '../../pipes/render-pipe';
import { SearchPipe } from '../../pipes/search-pipe';
import { SortPipe } from '../../pipes/sort.pipe';

import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxPaginationModule } from 'ngx-pagination';

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
    NgxDnDModule,
  ],
  exports: [BaseComponent],
})
export class BaseModule {
}
