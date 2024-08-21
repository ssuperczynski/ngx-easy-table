import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseComponent } from './components/base/base.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, tableReducer } from './reducers/table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TableEffects } from './effects/table.effects';

@NgModule({
  imports: [
    CommonModule,
    BaseComponent,
    StoreModule.forRoot(
      {
        table: tableReducer,
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([TableEffects]),
  ],
  exports: [BaseComponent],
  providers: [],
})
export class TableModule {}
