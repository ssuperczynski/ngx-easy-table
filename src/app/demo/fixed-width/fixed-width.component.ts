import { Component } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';

@Component({
  selector: 'app-fixed-width',
  templateUrl: './fixed-width.component.html',
  styleUrls: ['./fixed-width.component.css'],
  providers: [ConfigService],
})
export class FixedWidthComponent {

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

  onChange() {
    this.configuration.fixedColumnWidth = !this.configuration.fixedColumnWidth;
    this.configuration = { ...this.configuration };
  }
}
