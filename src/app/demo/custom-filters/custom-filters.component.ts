import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-custom-filters',
  templateUrl: './custom-filters.component.html',
  styleUrls: ['./custom-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFiltersComponent {

  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'Active' },
  ];
  data: Company[] = [];
  rows: Company[] = [];
  public configuration: Config;

  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.rows = data;
  }

  onCompanySearch(value: string): void {
    this.rows = this.data.filter((_) => _.company.toLowerCase().indexOf(value) > -1);
  }

  onAgeSearch(value: number): void {
    this.rows = this.data.filter((_) => _.age > value);
  }

  onStatusChange(value: string): void {
    this.rows = this.data.filter((_) => _.isActive === (value === 'true'));
  }

  reset(): void {
    this.rows = this.data;
  }

}
