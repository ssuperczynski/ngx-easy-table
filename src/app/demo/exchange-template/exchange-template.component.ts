import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-exchange-template',
  templateUrl: './exchange-template.component.html',
  styleUrls: ['./exchange-template.component.css'],
  providers: [ConfigService],
})
export class ExchangeTemplateComponent implements OnInit {

  columns = [
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

  ngOnInit() {
  }

}
