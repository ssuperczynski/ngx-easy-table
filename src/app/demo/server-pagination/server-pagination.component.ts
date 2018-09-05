import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-server-pagination',
  templateUrl: './server-pagination.component.html',
  styleUrls: ['./server-pagination.component.css'],
  providers: [ConfigService, CompanyService],
})
export class ServerPaginationComponent implements OnInit {
  columns = [
    { key: 'email', title: 'Email' },
    { key: 'company', title: 'Company' },
    { key: 'eyeColor', title: 'Color' },
    { key: 'age', title: 'Age' },
    { key: 'balance', title: 'Balance' },
    { key: 'surname', title: 'Surname' },
    { key: 'name', title: 'Name' },
    { key: 'id', title: 'ID' },
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

  eventEmitted($event) {
    this.parseEvent($event);
  }

  private parseEvent(obj: EventObject) {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    const params = `_limit=${this.pagination.limit}&_page=${this.pagination.offset}`; // see https://github.com/typicode/json-server
    this.getData(params);
  }

  private getData(params: string): void {
    this.configuration = ConfigService.config;
    this.configuration.isLoading = true;
    this.companyService.getCompanies(params)
      .subscribe((response: Company[]) => {
          this.data = response;
          // ensure this.pagination.count is set only once and contains count of whole array not just paginated one
          this.pagination.count = (this.pagination.count === -1) ? response.length : this.pagination.count;
          this.pagination = { ...this.pagination };
          this.configuration.isLoading = false;
        },
        (error) => {
          console.error('ERROR: ', error.message);
        });
  }

}

interface EventObject {
  event: string;
  value: any;
}
