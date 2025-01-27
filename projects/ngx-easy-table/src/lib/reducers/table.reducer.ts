import { ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import * as TableActions from '../actions/table.actions';
import { isDevMode } from '@angular/core';
import { DefaultConfig, DefaultConfigService } from '../services/config-service';
import { FiltersService } from '../services/filters.service';
import { Modifier } from '../model/modifier';
import { AppState } from '../model/app-state';
import { CellClass } from '../model/api';

export const initialState: AppState = {
  rows: [],
  initialRows: [],
  columns: [],
  config: { ...DefaultConfig },
  modifiers: {
    filters: new Map(),
    pagination: {
      currentPage: 0,
      itemsPerPage: 10,
      initialCollectionSize: 0,
      filteredCollectionSize: 0,
    },
  } as Modifier,
};

export const tableReducer = createReducer(
  initialState,
  on(TableActions.getRows, (state) => ({ ...state, rows: state.rows })),
  on(TableActions.setRows, (state, { rows }) => {
    return {
      ...state,
      rows: rows.map((row, index) => ({
        ...row,
        index: index,
      })),
      initialRows: rows.map((row, index) => ({
        ...row,
        index: index,
      })),
      modifiers: {
        ...state.modifiers,
        pagination: {
          ...state.modifiers.pagination,
          initialCollectionSize: rows.length,
          filteredCollectionSize: rows.length,
        },
      },
    };
  }),
  on(TableActions.setRowClass, (state, { classes }) => {
    const arr = Array.isArray(classes) ? classes : [classes];

    return {
      ...state,
      rows: state.rows.map((row) => {
        const match = arr.find((c) => row.index + 1 === c.row);
        return match ? { ...row, classList: match.className } : row;
      }),
    };
  }),
  on(TableActions.setRowStyles, (state, { styles }) => {
    const arr = Array.isArray(styles) ? styles : [styles];
    return {
      ...state,
      rows: state.rows.map((row) => {
        const match = arr.find((c) => row.index + 1 === c.row);
        return match ? { ...row, styles: `${match.attr}: ${match.value}` } : row;
      }),
    };
  }),
  on(TableActions.setCellClass, (state, { classes }) => {
    const arr = Array.isArray(classes) ? classes : [classes];

    return {
      ...state,
      rows: state.rows.map((row) => {
        const match: CellClass | undefined = arr.find((c) => row.index + 1 === c.row);
        if (match) {
          return {
            ...row,
            cellClasses: {
              ...row.cellClasses,
              [match.cell]: match.className,
            },
          };
        } else {
          return row;
        }
      }),
    };
  }),
  on(TableActions.collapseRow, (state, { index }) => {
    return {
      ...state,
      rows: [
        ...state.rows.map((row, rowIndex) => {
          if (rowIndex === index) {
            return { ...row, isCollapsed: !(row.isCollapsed || false) };
          }
          return row;
        }),
      ],
    };
  }),
  on(TableActions.selectRadio, (state, { index }) => {
    return {
      ...state,
      rows: [
        ...state.rows.map((row, rowIndex) => {
          return { ...row, radioSelected: rowIndex === index };
        }),
      ],
    };
  }),
  on(TableActions.selectCheckbox, (state, { index, selected }) => {
    return {
      ...state,
      rows: [
        ...state.rows.map((row, rowIndex) => {
          if (rowIndex === index) {
            return { ...row, checkboxSelected: selected === null ? true : selected };
          }
          return row;
        }),
      ],
    };
  }),
  on(TableActions.globalSearch, (state, { filter }) => {
    if (state.config.serverPagination) {
      return { ...state, rows: state.initialRows };
    }
    if (typeof filter === 'undefined' || Object.keys(filter).length === 0 || filter === '') {
      return {
        ...state,
        rows: state.initialRows,
        modifiers: {
          ...state.modifiers,
          pagination: {
            currentPage: 0,
            itemsPerPage: state.modifiers.pagination.itemsPerPage,
            initialCollectionSize: state.initialRows.length,
            filteredCollectionSize: state.rows.length,
          },
        },
      };
    }
    const newArr = state.initialRows.filter((row) => {
      const element = JSON.stringify(Object.values(row));
      const strings = filter.split(',');
      return strings.some(
        (s) => element.toLocaleLowerCase().indexOf(s.trim().toLocaleLowerCase()) > -1
      );
    });

    return {
      ...state,
      rows: newArr,
      modifiers: {
        ...state.modifiers,
        pagination: {
          ...state.modifiers.pagination,
          currentPage: 0,
          filteredCollectionSize: newArr.length,
        },
      },
    };
  }),
  on(TableActions.setFilters, (state, { filter }) => {
    const newFilters = new Map<string, string>(state.modifiers.filters);
    filter.forEach((f) => {
      if (Object.keys(f).length === 0 || f.value === '') {
        newFilters.delete(f.key);
      } else {
        newFilters.set(f.key, f.value.toString().toLocaleLowerCase());
      }
    });
    return {
      ...state,
      modifiers: { ...state.modifiers, filters: newFilters },
    };
  }),
  on(TableActions.setOrder, (state, { column }) => {
    if (!column.orderEnabled) {
      return state;
    }

    //   if (!this.config.orderEventOnly && !column.orderEventOnly) {
    //     this.sortBy.key = this.sortKey;
    //     this.sortBy.order = this.sortState.get(this.sortKey);
    //   } else {
    //     this.sortBy.key = '';
    //     this.sortBy.order = '';
    //   }
    //   if (!this.config.serverPagination) {
    //     this.facade.setRows([...this.data]);
    //     this.sortBy = { ...this.sortBy };
    //   }
    // private setColumnOrder(column: Columns): void {
    //   switch (this.sortState.get(key)) {
    //     case '':
    //     case undefined:
    //       this.sortState.set(key, column.orderBy || 'desc');
    //       break;
    //     case 'asc':
    //       this.config.threeWaySort ? this.sortState.set(key, '') : this.sortState.set(key, 'desc');
    //       break;
    //     case 'desc':
    //       this.sortState.set(key, 'asc');
    //       break;
    //   }
    // }

    const compare = (a: any[], b: any[], key: string) => {
      const split = key.split('.');
      const aPath = FiltersService.getPath(split, a);
      const bPath = FiltersService.getPath(split, b);
      const aValue = (aPath + '').toLowerCase();
      const bValue = (bPath + '').toLowerCase();
      if (
        isNaN(parseFloat(aPath)) ||
        !isFinite(aPath) ||
        isNaN(parseFloat(bPath)) ||
        !isFinite(bPath)
      ) {
        return aValue.localeCompare(bValue);
      }
      if (parseFloat(aPath) < parseFloat(bPath)) {
        return -1;
      }
      if (parseFloat(aPath) > parseFloat(bPath)) {
        return 1;
      }

      return 0;
    };

    if (column.orderBy === 'asc') {
      return {
        ...state,
        rows: [...state.rows].sort((a, b) => compare(a, b, column.key as string)),
        columns: [...state.columns].map((c) => {
          return {
            ...c,
            orderBy: c.key === column.key ? 'desc' : undefined,
          };
        }),
      };
    }

    return {
      ...state,
      rows: [...state.rows].sort((b, a) => compare(a, b, column.key as string)),
      columns: [...state.columns].map((c) => {
        return {
          ...c,
          orderBy: c.key === column.key ? 'asc' : undefined,
        };
      }),
    };
  }),
  on(TableActions.setPagination, (state, { page, itemsPerPage }) => {
    return {
      ...state,
      rows: state.rows,
      modifiers: {
        ...state.modifiers,
        pagination: {
          currentPage: page,
          itemsPerPage: itemsPerPage,
          initialCollectionSize: state.initialRows.length,
          filteredCollectionSize: state.rows.length,
        },
      },
    };
  }),
  on(TableActions.search, (state, { filter }) => {
    if (state.config.serverPagination || !filter) {
      return { ...state, rows: state.initialRows };
    }

    const newArr = state.initialRows.filter((obj) => {
      return Array.from(state.modifiers.filters.entries()).every(([filterKey, value]) => {
        const split = filterKey.split('.');
        const val = FiltersService.getPath(split, obj);
        const element =
          typeof val === 'object' ? JSON.stringify(val) : val.toString().toLocaleLowerCase();
        const strings = value.split(',');
        return strings.some((s) => {
          return element.indexOf(s.trim()) > -1;
        });
      });
    });

    return {
      ...state,
      rows: [...newArr],
      modifiers: {
        ...state.modifiers,
        pagination: {
          ...state.modifiers.pagination,
          currentPage: 0,
          filteredCollectionSize: newArr.length,
        },
      },
    };
  }),

  on(TableActions.getConfig, (state) => ({ ...state, config: state.config })),
  on(TableActions.setConfig, (state, { config }) => {
    if (config) {
      return { ...state, config: { ...config } };
    } else {
      return { ...state, config: { ...DefaultConfigService.config } };
    }
  }),

  on(TableActions.getColumns, (state) => ({ ...state, columns: state.columns })),
  on(TableActions.setColumns, (state, { columns }) => {
    return { ...state, columns: [...columns] };
  })
);

export function logger(
  reducer: ActionReducer<{ table: AppState }>
): ActionReducer<{ table: AppState }> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<{ table: AppState }>[] = isDevMode() ? [logger] : [];
