import { Component } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
  providers: [ConfigService],
})
export class ExportComponent {

  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data = [];
  configuration;
  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }
}
