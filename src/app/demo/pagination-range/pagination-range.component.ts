import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { phone, random, company, name } from 'faker';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-pagination-range',
  templateUrl: './pagination-range.component.html',
  styleUrls: ['./pagination-range.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationRangeComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  data = [];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationMaxSize = 7;
    this.data = PaginationRangeComponent.generateData();
  }

  private static generateData(): Array<{
    phone: string;
    age: string;
    company: string;
    name: string;
    isActive: boolean;
  }> {
    return Array(170)
      .fill('')
      .map(() => {
        return {
          phone: phone.phoneNumberFormat(),
          age: random.number({ min: 15, max: 70 }).toString(),
          company: company.companyName(),
          name: `${name.firstName()} ${name.lastName()}`,
          isActive: random.boolean(),
        };
      });
  }
}
