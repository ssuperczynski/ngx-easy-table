import { Component } from '@angular/core';
import { data } from '../../../assets/data';
import { ConfigService } from './configuration.service';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-select-all-template',
  templateUrl: './select-all-template.component.html',
  styleUrls: ['./select-all-template.component.css'],
  providers: [ConfigService],
})
export class SelectAllTemplateComponent {

  public columns: Columns[] = [
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'phone', title: 'Phone' },
    { key: 'address.street', title: 'Street' },
  ];
  data: any[] = [];
  allSelected = false;
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data.splice(1, 5);
  }

  tableEventEmitted(event: { event: string, value: any }): void {
    if (event.event === 'onSelectAll') {
      this.data.forEach((row: any) => row.selected = event.value);
    }
  }

  rowSelected(): void {
    this.allSelected = this.data.every((row) => !!row.selected);
  }

}
