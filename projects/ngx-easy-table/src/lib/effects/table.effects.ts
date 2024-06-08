import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';

import * as TableActions from '../actions/table.actions';
import { AppState } from '../model/app-state';
import { EventService } from '../services/event.service';

@Injectable()
export class TableEffects {
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

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private eventService: EventService
  ) {}
}
