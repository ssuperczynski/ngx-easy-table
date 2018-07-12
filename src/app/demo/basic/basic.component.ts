import { Component } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';
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

  data = [];

  constructor() {
    this.data = data;
    this.configuration = ConfigService.config;
  }
}
