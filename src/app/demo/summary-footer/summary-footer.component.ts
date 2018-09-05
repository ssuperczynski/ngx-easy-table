import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-styles',
  templateUrl: './summary-footer.component.html',
  styleUrls: ['./summary-footer.component.css'],
})
export class SummaryFooterComponent implements OnInit {

  configuration;
  ageSummary = 0;
  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  data: Company[] = [];

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
    this.ageSummary = this.data.map((_) => _.age).reduce((acc, cur) => cur + acc , 0);
  }

  ngOnInit() {
  }

}
