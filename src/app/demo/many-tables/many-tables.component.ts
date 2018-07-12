import { Component, OnInit } from '@angular/core';
import { ConfigurationBasicService } from './configuration-basic.service';
import { ConfigurationAdvancedService } from './configuration-advanced.service';
import { data } from '@assets/data';
@Component({
  selector: 'app-many-tables',
  templateUrl: './many-tables.component.html',
  styleUrls: ['./many-tables.component.css'],
  providers: [ConfigurationBasicService, ConfigurationAdvancedService],
})
export class ManyTablesComponent implements OnInit {

  configurationBasic;
  configurationAdvanced;
  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  data = [];

  constructor() {
    this.configurationBasic = ConfigurationBasicService.config;
    this.configurationAdvanced = ConfigurationAdvancedService.config;
    this.data = data;
  }
  ngOnInit() {
  }

}
