import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-fixed-width',
  templateUrl: './fixed-width.component.html',
  styleUrls: ['./fixed-width.component.css'],
  providers: [ConfigService],
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
  configuration;
  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  onChange(): void {
    this.configuration.fixedColumnWidth = !this.configuration.fixedColumnWidth;
    this.configuration = { ...this.configuration };
  }
}
