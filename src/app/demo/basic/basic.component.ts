import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  providers: [ConfigService],
})
export class BasicComponent {
  configuration;
  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  data: Company[] = [];

  constructor() {
    this.data = data;
    this.configuration = ConfigService.config;
  }
}
