import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-custom-filters',
  templateUrl: './custom-filters.component.html',
  styleUrls: ['./custom-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFiltersComponent implements OnInit {
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

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.rows = data;
  }

  onCompanySearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rows = this.data.filter((_) => _.company.toLowerCase().indexOf(value) > -1);
  }

  onAgeSearch(event: Event): void {
    const value = ((event.target as HTMLInputElement).value as unknown) as number;
    this.rows = this.data.filter((_) => _.age > value);
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rows = this.data.filter((_) => _.isActive === (value === 'true'));
  }

  reset(): void {
    this.rows = this.data;
  }
}
