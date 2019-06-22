import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseComponent } from './base.component';

import { CsvExportComponent } from '../csv-export.component';
import { HeaderComponent } from '../header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';

import { GlobalSearchPipe } from '../../pipes/global-search-pipe';
import { RenderPipe } from '../../pipes/render-pipe';
import { SearchPipe } from '../../pipes/search-pipe';
import { SortPipe } from '../../pipes/sort.pipe';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    BaseComponent,
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
    DragDropModule,
    ScrollingModule,
  ],
  exports: [BaseComponent],
})
export class BaseModule {
}
