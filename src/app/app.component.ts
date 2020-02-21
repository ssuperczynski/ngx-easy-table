import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ROUTE } from './route-names';

export interface Link {
  link: string;
  name: string;
  experimental?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {
  }

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public readonly version = environment.VERSION;
  public showMenu = true;
  public selected: Link;
  public searchTerm = '';
  public readonly menu = {
    basic: [
      { link: ROUTE.BASIC, name: 'Basic' },
      { link: ROUTE.ASYNC, name: 'Async resource' },
      { link: ROUTE.PAGINATION, name: 'Pagination' },
      { link: ROUTE.SERVER_PAGINATION, name: 'Server pagination' },
      { link: ROUTE.SERVER_SORT, name: 'Server sort' },
      { link: ROUTE.CLICK_EVENT, name: 'Click event' },
      { link: ROUTE.MANY_TABLES, name: 'Many tables' },
      { link: ROUTE.DYNAMIC_ROW, name: 'Dynamic row' },
      { link: ROUTE.HORIZONTAL_SCROLL, name: 'Horizontal scroll' },
      { link: ROUTE.DYNAMIC_CONFIGURATION, name: 'Dynamic configuration' },
      { link: ROUTE.EXPORTS, name: 'Exports' },
      { link: ROUTE.RESIZABLE, name: 'Column resizer' },
      { link: ROUTE.COLUMN_WIDTH, name: 'Column width' },
      { link: ROUTE.FIXED_WIDTH, name: 'Fixed width' },
      { link: ROUTE.PERSIST_STATE, name: 'Persist state' },
      { link: ROUTE.PERSIST_STATE_ROUTER('column=phone&sort=desc'), name: 'Persist state router' },
      { link: ROUTE.CONTEXT_MENU, name: 'Context menu' },
      { link: ROUTE.PINNED, name: 'Pinned column' },
      { link: ROUTE.COLUMN_CLASS, name: 'Column Class' },
      { link: ROUTE.MOBILE, name: 'Mobile view' },
      { link: ROUTE.NESTED_OBJECT, name: 'Nested object' },
      { link: ROUTE.REORDER, name: 'Reorder' },
      // { link: ROUTE.INFINITE_SCROLL, name: 'Infinite scroll', experimental: true },
      { link: ROUTE.INFINITE_SCROLL_SERVER, name: 'Infinite scroll server', experimental: true },
      { link: ROUTE.INFINITE_SCROLL_SERVER_TEMPLATE, name: 'Infinite scroll server template', experimental: true },
    ],
    templates: [
      { link: ROUTE.TEMPLATE, name: 'Basic template' },
      { link: ROUTE.MODAL, name: 'Modal' },
      { link: ROUTE.LIVE_UPDATE, name: 'Live update' },
      { link: ROUTE.ROW_TEMPLATE, name: 'Row details' },
      { link: ROUTE.COL_TEMPLATE, name: 'Col template' },
      { link: ROUTE.GROUP_ROWS, name: 'Group rows', experimental: true },
      { link: ROUTE.COLLAPSED_ROWS, name: 'Collapsed rows' },
      { link: ROUTE.CHECKBOXES, name: 'Checkboxes' },
      { link: ROUTE.CHECKBOX_DEFAULT, name: 'Checkboxes template' },
      { link: ROUTE.CHECKBOX_AS_RADIO, name: 'Checkbox as radio' },
      { link: ROUTE.RADIO, name: 'Radio' },
      { link: ROUTE.CUSTOMIZE_THEME, name: 'Customize theme' },
      { link: ROUTE.NESTED_TABLE, name: 'Nested table' },
      { link: ROUTE.INLINE_CELL, name: 'Edit cell' },
      { link: ROUTE.INLINE_ROW, name: 'Edit row' },
      { link: ROUTE.STYLES, name: 'Styles' },
      { link: ROUTE.SUMMARY_FOOTER, name: 'Summary footer' },
      { link: ROUTE.FILTER_TEMPLATE, name: 'Filter template' },
      { link: ROUTE.FILTER_HEADER_TEMPLATE, name: 'Filter header template' },
      { link: ROUTE.PAGINATION_RANGE, name: 'Pagination range' },
      { link: ROUTE.SELECT_ALL_TEMPLATE, name: 'Select All template' },
      { link: ROUTE.NO_RESULTS_TEMPLATE, name: 'No Results template' },
      { link: ROUTE.LOADING_TEMPLATE, name: 'Loading template' },
      { link: ROUTE.ADDITIONAL_ACTIONS_TEMPLATE, name: 'Additional actions' },
      { link: ROUTE.CUSTOM_PAGINATION, name: 'Custom pagination' },
    ],
    select: [
      { link: ROUTE.SELECT_ROW, name: 'Select row' },
      { link: ROUTE.SELECT_COL, name: 'Select col' },
      { link: ROUTE.SELECT_CELL, name: 'Select cell' },
    ],
    filters: [
      { link: ROUTE.SEARCH, name: 'Search' },
      { link: ROUTE.GLOBAL_SEARCH, name: 'Global search' },
      { link: ROUTE.CUSTOM_FILTERS, name: 'Custom filters' },
      { link: ROUTE.TOGGLE_COLUMN, name: 'Toggle column' },
    ],
    sort: [
      { link: ROUTE.SORT, name: 'Sort' },
      { link: ROUTE.CUSTOM_SORT, name: 'Custom sort' },
      { link: ROUTE.CUSTOM_INTABLE_SORT, name: 'Custom in-table sort' },
    ],
    api: [
      { link: ROUTE.API, name: 'API', experimental: true },
      { link: ROUTE.BOOTSTRAP, name: 'Bootstrap', experimental: true },
    ],
  };

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((route) => {
        if (route instanceof NavigationEnd) {
          const url = route.url.replace('/', '');
          Object.values(this.menu).forEach((value) => value.forEach((entry) => {
            if (entry.link === url) {
              this.select({
                link: url,
                name: entry.name,
              });
            }
          }));
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  select(selected: Link): void {
    this.selected = selected;
    this.showMenu = !this.showMenu;
  }

  get excludedLinks(): boolean {
    return [ROUTE.BASIC, ROUTE.API_DOC, ROUTE.DOC, ROUTE.INSTALLATION].includes(this.selected.link);
  }

  onMenuSearch(value: string): void {
    this.searchTerm = value;
  }
}
