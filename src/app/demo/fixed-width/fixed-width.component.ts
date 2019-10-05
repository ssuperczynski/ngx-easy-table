import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-fixed-width',
  templateUrl: './fixed-width.component.html',
  styleUrls: ['./fixed-width.component.css'],
})
export class FixedWidthComponent {

  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  public configuration: Config;
  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  onChange(): void {
    this.configuration.fixedColumnWidth = !this.configuration.fixedColumnWidth;
    this.configuration = { ...this.configuration };
  }
}
