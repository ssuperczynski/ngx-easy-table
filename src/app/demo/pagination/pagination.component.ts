import { Component, OnInit } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  providers: [ConfigService],
  styles: [],
})
export class PaginationComponent implements OnInit {

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
  ngOnInit() {
  }

}
