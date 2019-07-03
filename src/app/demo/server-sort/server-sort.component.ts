import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { Columns, DefaultConfig } from 'ngx-easy-table';

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
export class ServerSortComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  public data;
  public configuration;
  public pagination = {
    limit: 10,
    offset: 0,
    count: -1,
  };

  constructor(private readonly companyService: CompanyService) {
  }

  ngOnInit() {
    this.configuration = DefaultConfig;
    this.getData('');
  }

  eventEmitted(event) {
    this.parseEvent(event);
  }

  private parseEvent(obj: EventObject) {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    let params = `_limit=${this.pagination.limit}&_page=${this.pagination.offset}`; // see https://github.com/typicode/json-server
    if (obj.event === 'onOrder') {
      params += `&_sort=${obj.value.key}&_order=${obj.value.order}`;
    }
    this.getData(params);
  }

  private getData(params: string) {
    this.companyService.getCompanies(params)
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
