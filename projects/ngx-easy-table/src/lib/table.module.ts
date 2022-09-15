import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxTableComponent } from './components/base/ngx-table.component';
import { BaseModule } from './components/base/base.module';

@NgModule({
  imports: [CommonModule, BaseModule],
  exports: [NgxTableComponent],
  providers: [],
})
export class TableModule {}
