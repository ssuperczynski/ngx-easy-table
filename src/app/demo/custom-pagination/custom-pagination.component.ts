import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, API, DefaultConfig, Config, APIDefinition, Pagination } from 'ngx-easy-table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
  // eslint-disable-next-line
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPaginationComponent implements OnInit, AfterViewInit {
  @ViewChild('table') public table: APIDefinition;
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;
  public paginationTotalItems: number;
  pagination: Pagination;
  public total;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = true;
    this.configuration.fixedColumnWidth = true;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = data;
  }

  ngAfterViewInit(): void {
    this.paginationTotalItems = this.table.apiEvent({
      type: API.getPaginationTotalItems,
    });
    this.cdr.detectChanges();
  }

  paginationEvent($event: PageEvent): void {
    this.pagination = {
      ...this.pagination,
      limit: $event.pageSize,
      offset: $event.pageIndex + 1,
      count: $event.length,
    };
  }
}
