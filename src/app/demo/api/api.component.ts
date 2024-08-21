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
    this.configuration = {
      ...this.configuration,
      [key]: isChecked,
    };
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
    this.current = JSON.stringify(this.current);
  }

  getTotal(): void {
    this.total = this.table.apiEvent({
      type: API.getPaginationTotalItems,
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

  setCellClass(row: number, cell: string, className: string): void {
    this.table.apiEvent({
      type: API.setCellClass,
      value: { row, cell, className },
    });
  }

  setRowStyle(): void {
    this.table.apiEvent({
      type: API.setRowStyle,
      value: [
        { row: 1, attr: '--bs-table-bg', value: 'lightblue' },
        { row: 2, attr: '--bs-table-hover-color', value: 'red' },
        { row: 3, attr: '--bs-table-bg', value: '#f8d7da' },
      ],
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
          className: 'table-secondary',
        },
        {
          row: 2,
          className: 'table-danger',
        },
        {
          row: 4,
          className: 'table-warning',
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
          cell: 'age',
          className: 'table-secondary',
        },
        {
          row: 3,
          cell: 'name',
          className: 'table-info',
        },
        {
          row: 4,
          cell: 'age',
          className: 'table-dark',
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
