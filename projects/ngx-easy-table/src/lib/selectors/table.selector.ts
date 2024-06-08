import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../model/app-state';

export const selectTableState = createFeatureSelector<AppState>('table');

export const selectTableRows = createSelector(selectTableState, (state: AppState) => state.rows);

export const selectTableColumns = createSelector(
  selectTableState,
  (state: AppState) => state.columns
);
export const selectTableConfig = createSelector(
  selectTableState,
  (state: AppState) => state.config
);
export const selectModifiers = createSelector(
  selectTableState,
  (state: AppState) => state.modifiers
);
