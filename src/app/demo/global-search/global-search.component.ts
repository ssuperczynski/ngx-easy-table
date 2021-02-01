import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, API, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class GlobalSearchComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }
}
