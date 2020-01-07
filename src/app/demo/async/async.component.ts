import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css'],
  providers: [CompanyService],
})
export class AsyncComponent implements OnInit {
  public configuration: Config;
  public data$: Observable<HttpResponse<Company[]>>;
  public columns: Columns[];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data$ = this.companyService.getCompanies('', false);
  }
}
