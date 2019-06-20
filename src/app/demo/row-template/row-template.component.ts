import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-row-template',
  templateUrl: './row-template.component.html',
  styleUrls: ['./row-template.component.css'],
  providers: [ConfigService],
})
export class RowTemplateComponent {
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

}
