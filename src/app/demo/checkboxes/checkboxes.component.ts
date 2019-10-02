import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css'],
})
export class CheckboxesComponent {
  configuration;
  public columns: Columns[] = [
    { key: '', title: '', searchEnabled: false },
    { key: 'name', title: 'Name' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Supervisor' },
    { key: 'phone', title: 'Phone' },
  ];

  data: Company[] = [];
  selected = new Set();

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  onChange(row: any): void {
    const index = this.data.indexOf(row);
    this.selected.add(index);
  }
}
