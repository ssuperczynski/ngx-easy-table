import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from '@core/ngx-easy-table/components/base/base.component';
import { BaseModule } from '@core/ngx-easy-table/components/base/base.module';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
  ],
  bootstrap: [BaseComponent],
  exports: [BaseComponent],
  providers: []
})
export class TableModule {
}
