import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface EventObject {
  event: string;
  value: {
    limit: number;
    page: number;
    key: number;
    order: number;
  };
}

@Component({
  selector: 'app-server-sort',
  templateUrl: './server-sort.component.html',
  styleUrls: ['./server-sort.component.css'],
  providers: [CompanyService],
})
export class ServerSortComponent implements OnInit, OnDestroy {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public data;
  public configuration: Config;
  public pagination = {
    limit: 10,
    offset: 0,
    count: -1,
    sort: null,
    order: null,
  };

  constructor(private readonly companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.configuration = {...DefaultConfig};
    this.configuration.serverPagination = true;
    this.configuration.threeWaySort = true;
    this.getData('');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  eventEmitted(event: { event: string, value: any }): void {
    if (event.event !== 'onClick') {
      this.parseEvent(event);
    }
  }

  private parseEvent(obj: EventObject): void {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination.sort = !!obj.value.key ? obj.value.key : this.pagination.sort;
    this.pagination.order = !!obj.value.order ? obj.value.order : this.pagination.order;
    this.pagination = { ...this.pagination };
    // see https://github.com/typicode/json-server
    const pagination = `_limit=${this.pagination.limit}&_page=${this.pagination.offset}`;
    const sort = `&_sort=${this.pagination.sort}&_order=${this.pagination.order}`;
    this.getData(pagination + sort);
  }

  private getData(params: string): void {
    this.companyService.getCompanies(params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: Company[]) => {
          this.data = response;
          // ensure this.pagination.count is set only once and contains count of the whole array, not just paginated one
          this.pagination.count = (this.pagination.count === -1) ? response.length : this.pagination.count;
          this.pagination = { ...this.pagination };
        },
        (error) => {
          console.error('ERROR: ', error.message);
        });
  }
}
