import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css'],
  providers: [CompanyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncComponent implements OnInit {
  public configuration: Config;
  public data$: Observable<any>;
  public columns: Columns[];

  constructor(private companyService: CompanyService) {}

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
