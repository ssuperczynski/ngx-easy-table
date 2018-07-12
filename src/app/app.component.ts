import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showMenu = false;

  basic = [
    { link: '/', name: 'Basic', },
    { link: '/pagination', name: 'Pagination', },
    { link: '/server-pagination', name: 'Server pagination', },
    { link: '/server-sort', name: 'Server sort', },
    { link: '/export-csv', name: 'Export to CSV', },
    { link: '/click-event', name: 'Click event', },
    { link: '/many-tables', name: 'Many tables', },
    { link: '/dynamic-row', name: 'Dynamic row', },
    { link: '/horizontal-scroll', name: 'Horizontal scroll', },
    { link: '/dynamic-conf', name: 'Dynamic configuration', },
    { link: '/exports', name: 'Exports', },
    { link: '/column-resizer', name: 'Column resizer', },
    { link: '/column-width', name: 'Column width', },
    { link: '/fixed-width', name: 'Fixed width', },
  ];
  templates = [
    { link: '/template', name: 'Basic template', },
    { link: '/modal', name: 'Modal', },
    { link: '/live-update', name: 'Live update', },
    { link: '/row-template', name: 'Row details', },
    { link: '/col-template', name: 'Col template', },
    { link: '/group-rows', name: 'Group rows', },
    { link: '/collapsed-rows', name: 'Collapsed rows', },
    { link: '/checkboxes', name: 'Checkboxes', },
    { link: '/checkboxes2', name: 'Checkboxes2', },
    { link: '/customize-theme', name: 'Customize theme', },
    { link: '/styles', name: 'Styles', },
    { link: '/summary-footer', name: 'Summary footer', },
  ];
  select = [
    { link: '/select-row', name: 'Select row', },
    { link: '/select-col', name: 'Select col', },
    { link: '/select-cell', name: 'Select cell', },
  ];
  filters = [
    { link: '/search', name: 'Search', },
    { link: '/global-search', name: 'Global search', },
    { link: '/custom-filters', name: 'Custom filters', },
    { link: '/toggle-column', name: 'Toggle column', },
  ];
  sort = [
    { link: '/sort', name: 'Sort', },
    { link: '/custom-sort', name: 'Custom sort', },
  ];
}
