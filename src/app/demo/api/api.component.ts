import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Company, data } from '../../../assets/data';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiComponent implements OnInit, AfterViewInit {
  @ViewChild('table') table: APIDefinition;
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;
  public total;
  public current;
  public itemsPerPage;
  public last;
  public checked = {
    paginationEnabled: true,
    searchEnabled: true,
    collapseAllRows: false,
    isLoading: false,
    checkboxes: false,
  };

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.columns = [
      { key: 'phone', title: 'Phone', width: '15%' },
      { key: 'age', title: 'Age', width: '10%' },
      { key: 'company', title: 'Company', width: '15%' },
      { key: 'name', title: 'Name', width: '15%' },
      { key: 'name', title: 'Name', width: '15%' },
      { key: 'isActive', title: 'STATUS', width: '15%' },
    ];
    this.data = data;
  }

  ngAfterViewInit(): void {
    this.setRowStyle();
  }

  toggle(key: string, event: Event): void {
    const isChecked = (event.currentTarget as HTMLInputElement).checked;
    this.checked[key] = isChecked;
    this.configuration[key] = isChecked;
    this.configuration = { ...this.configuration };
  }

  resetSearchInput(): void {
    this.table.apiEvent({
      type: API.setInputValue,
      value: [
        { key: 'phone', value: '' },
        { key: 'age', value: '' },
        { key: 'company', value: '' },
      ],
    });
  }

  setPhone(): void {
    this.table.apiEvent({
      type: API.setInputValue,
      value: [{ key: 'phone', value: '527' }],
    });
  }

  // eslint-disable-next-line
  setAge(): void {
    this.table.apiEvent({
      type: API.setInputValue,
      value: [{ key: 'age', value: '32' }],
    });
  }

  setPagination(page: number): void {
    this.table.apiEvent({
      type: API.setPaginationCurrentPage,
      value: page,
    });
  }

  getPaginationCurrent(): void {
    this.current = this.table.apiEvent({
      type: API.getPaginationCurrentPage,
    });
  }

  getTotal(): void {
    this.total = this.table.apiEvent({
      type: API.getPaginationTotalItems,
    });
  }

  getLastPage(): void {
    this.last = this.table.apiEvent({
      type: API.getPaginationLastPage,
    });
  }

  getNumberOfRowsPerPage(): void {
    this.itemsPerPage = this.table.apiEvent({
      type: API.getNumberOfRowsPerPage,
    });
  }

  setRowClass(row: number, className: string): void {
    this.table.apiEvent({
      type: API.setRowClass,
      value: { row, className },
    });
  }

  setCellClass(row: number, cell: number, className: string): void {
    this.table.apiEvent({
      type: API.setCellClass,
      value: { row, cell, className },
    });
  }

  setRowStyle(): void {
    this.table.apiEvent({
      type: API.setRowStyle,
      value: { row: 1, attr: 'background', value: '#fd5e5ed4' },
    });
  }

  setCellStyle(): void {
    this.table.apiEvent({
      type: API.setCellStyle,
      value: { row: 1, cell: 3, attr: 'background', value: '#fd5e5ed4' },
    });
  }

  setRowClasses(): void {
    this.table.apiEvent({
      type: API.setRowClass,
      value: [
        {
          row: 1,
          className: 'gray',
        },
        {
          row: 2,
          className: 'pink',
        },
        {
          row: 4,
          className: 'yellow',
        },
      ],
    });
  }

  setCellClasses(): void {
    this.table.apiEvent({
      type: API.setCellClass,
      value: [
        {
          row: 1,
          cell: 2,
          className: 'gray',
        },
        {
          row: 4,
          cell: 6,
          className: 'pink',
        },
        {
          row: 4,
          cell: 3,
          className: 'yellow',
        },
      ],
    });
  }

  sortBy(column: string, order: 'asc' | 'desc'): void {
    this.table.apiEvent({
      type: API.sortBy,
      value: { column, order },
    });
  }

  setPaginationDisplayLimit(limit: number): void {
    this.table.apiEvent({
      type: API.setPaginationDisplayLimit,
      value: limit,
    });
  }
}
