import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';

import * as TableActions from '../actions/table.actions';
import { AppState } from '../model/app-state';
import { EventService } from '../services/event.service';

@Injectable()
export class TableEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<AppState>>(Store);
  private eventService = inject(EventService);

  setFilters$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TableActions.setFilters),
        tap((payload) => {
          this.store.dispatch(TableActions.search({ filter: payload.filter }));
        })
      ),
    { dispatch: false }
  );

  emitEvent$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((payload) => {
          this.store
            .select((state) => state)
            .pipe(take(1))
            .subscribe((state) => {
              this.eventService.emitData({ state, payload });
            });
        })
      ),
    { dispatch: false }
  );
}
