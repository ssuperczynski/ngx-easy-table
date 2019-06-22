import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { API, APIDefinition, Columns, DefaultConfig } from 'ngx-easy-table';

interface EventObject {
  event: string;
  value: {
    limit: number;
    page: number;
  };
}

@Component({
  selector: 'app-server-pagination',
  templateUrl: './server-pagination.component.html',
  styleUrls: ['./server-pagination.component.css'],
  providers: [CompanyService],
})
export class ServerPaginationComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;
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

  constructor(
    private readonly companyService: CompanyService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.configuration = DefaultConfig;
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
    this.configuration.isLoading = true;
    this.companyService.getCompanies(params)
      .subscribe((response: Company[]) => {
          this.data = response;
          // ensure this.pagination.count is set only once and contains count of the whole array, not just paginated one
          this.pagination.count = (this.pagination.count === -1) ? response.length : this.pagination.count;
          this.pagination = { ...this.pagination };
          this.configuration.isLoading = false;
          this.cdr.detectChanges();
          this.setRowStyle();
        },
        (error) => {
          console.error('ERROR: ', error.message);
        });
  }

  private setRowStyle(): void {
    this.table.apiEvent({
      type: API.setRowStyle,
      value: { row: 1, attr: 'background', value: '#fd5e5ed4' },
    });
  }

}
