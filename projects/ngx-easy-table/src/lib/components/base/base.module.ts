import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxTableComponent } from './ngx-table.component';

import { HeaderComponent } from '../header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';

import { GlobalSearchPipe } from '../../pipes/global-search-pipe';
import { RenderPipe } from '../../pipes/render-pipe';
import { SearchPipe } from '../../pipes/search-pipe';
import { SortPipe } from '../../pipes/sort.pipe';

import { TableTHeadComponent } from '../thead/thead.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {NgxPaginationModule} from "../../features/pagination";

const COMPONENTS: any[] = [
  NgxTableComponent,
  HeaderComponent,
  PaginationComponent,
  TableTHeadComponent
];

const PIPES: any[] = [
  SearchPipe,
  RenderPipe,
  GlobalSearchPipe,
  SortPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    DragDropModule,
    ScrollingModule
  ],
  exports: [NgxTableComponent],
})
export class BaseModule {
}
