import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-server-sort',
  templateUrl: './server-sort.component.html',
  styleUrls: ['./server-sort.component.css'],
  providers: [ConfigService, CompanyService],
})
export class ServerSortComponent implements OnInit {
  showSortDropdown = false;
  selectedOrder = '';
  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  orderDropdown = [
    {
      id: 0,
      key: 'name',
      order: 'asc',
      name: 'Name asc',
    },
    {
      id: 1,
      key: 'name',
      order: 'desc',
      name: 'Name desc',
    },
    {
      id: 2,
      key: 'company',
      order: 'asc',
      name: 'Company asc',
    },
  ];

  data;
  configuration;
  pagination = {
    limit: 10,
    offset: 0,
    count: -1,
  };

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
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
    this.configuration = ConfigService.config;
    this.companyService.getCompanies(params)
      .subscribe((response: Company[]) => {
          this.data = response;
          // ensure this.pagination.count is set only once and contains count of whole array not just paginated one
          this.pagination.count = (this.pagination.count === -1) ? response.length : this.pagination.count;
          this.pagination = { ...this.pagination };
        },
        (error) => {
          console.error('ERROR: ', error.message);
        });
  }

  orderBy(sort): void {
    this.selectedOrder = sort.id;
    const event = {
      event: 'onOrder',
      value: sort,
    };
    this.eventEmitted(event);
    this.showSortDropdown = false;
  }

}

interface EventObject {
  event: string;
  value: any;
}
