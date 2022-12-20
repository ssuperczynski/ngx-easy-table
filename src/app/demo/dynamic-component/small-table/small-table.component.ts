import { Component, Input, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Company, data } from '../../../../assets/data';

@Component({
  selector: 'app-small-table',
  template: `
    <p>{{ title }}</p>
    <ngx-table [data]="data" #table [configuration]="configuration" [columns]="columns"></ngx-table>
  `,
})
export class SmallTableComponent implements OnInit {
  @Input() title = '';
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.rows = 5;
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = data;
  }
}
