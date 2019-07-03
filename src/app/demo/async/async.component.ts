import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../../services/company.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css'],
  providers: [CompanyService],
})
export class AsyncComponent implements OnInit {
  public configuration: Config;
  public data$: Observable<Company[]>;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  constructor(private companyService: CompanyService) {
    this.configuration = DefaultConfig;
  }

  ngOnInit(): void {
    this.configuration.isLoading = true;
    this.data$ = this.companyService.getCompanies().pipe(
      tap(() => {
        this.configuration.isLoading = false;
      }),
    );
  }
}
