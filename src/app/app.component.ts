import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface Link {
  link: string;
  name: string;
  experimental?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
      { link: 'basic', name: 'Basic' },
      { link: 'async', name: 'Async resource' },
      { link: 'pagination', name: 'Pagination' },
      { link: 'server-pagination', name: 'Server pagination' },
      { link: 'server-sort', name: 'Server sort' },
      { link: 'click-event', name: 'Click event' },
      { link: 'many-tables', name: 'Many tables' },
      { link: 'dynamic-row', name: 'Dynamic row' },
      { link: 'horizontal-scroll', name: 'Horizontal scroll' },
      { link: 'dynamic-configuration', name: 'Dynamic configuration' },
      { link: 'exports', name: 'Exports' },
      { link: 'resizable', name: 'Column resizer' },
      { link: 'column-width', name: 'Column width' },
      { link: 'fixed-width', name: 'Fixed width' },
      { link: 'persist-state', name: 'Persist state' },
      { link: 'persist-state-router/column=phone&sort=desc', name: 'Persist state router' },
      { link: 'context-menu', name: 'Context menu' },
      { link: 'pinned', name: 'Pinned column' },
      { link: 'column-class', name: 'Column Class' },
      { link: 'mobile', name: 'Mobile view' },
      { link: 'nested-object', name: 'Nested object' },
    ],
    templates: [
      { link: 'template', name: 'Basic template' },
      { link: 'modal', name: 'Modal' },
      { link: 'live-update', name: 'Live update' },
      { link: 'row-template', name: 'Row details' },
      { link: 'col-template', name: 'Col template' },
      { link: 'group-rows', name: 'Group rows', experimental: true },
      { link: 'collapsed-rows', name: 'Collapsed rows' },
      { link: 'checkboxes', name: 'Checkboxes' },
      { link: 'checkbox-default', name: 'Checkboxes template' },
      { link: 'customize-theme', name: 'Customize theme' },
      { link: 'nested-table', name: 'Nested table' },
      { link: 'inline-cell', name: 'Edit cell' },
      { link: 'inline-row', name: 'Edit row' },
      { link: 'styles', name: 'Styles' },
      { link: 'summary-footer', name: 'Summary footer' },
      { link: 'filter-template', name: 'Filter template' },
      { link: 'filter-header-template', name: 'Filter header template' },
      { link: 'pagination-range', name: 'Pagination range' },
      { link: 'select-all-template', name: 'Select All template' },
      { link: 'no-results-template', name: 'No Results template' },
      { link: 'loading-template', name: 'Loading template' },
      { link: 'additional-actions-template', name: 'Additional actions' },
      { link: 'custom-pagination', name: 'Custom pagination' },
    ],
    select: [
      { link: 'select-row', name: 'Select row' },
      { link: 'select-col', name: 'Select col' },
      { link: 'select-cell', name: 'Select cell' },
    ],
    filters: [
      { link: 'search', name: 'Search' },
      { link: 'global-search', name: 'Global search' },
      { link: 'custom-filters', name: 'Custom filters' },
      { link: 'toggle-column', name: 'Toggle column' },
    ],
    sort: [
      { link: 'sort', name: 'Sort' },
      { link: 'custom-sort', name: 'Custom sort' },
      { link: 'custom-intable-sort', name: 'Custom in-table sort' },
    ],
    api: [
      { link: 'api', name: 'API', experimental: true },
      { link: 'bootstrap', name: 'Bootstrap', experimental: true },
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
    return ['basic', 'api-doc', 'doc', 'installation'].includes(this.selected.link);
  }

  onMenuSearch(value: string): void {
    this.searchTerm = value;
  }
}
