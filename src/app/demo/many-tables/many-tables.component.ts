import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigurationAdvancedService } from './configuration-advanced.service';
import { ConfigurationBasicService } from './configuration-basic.service';

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

  data: Company[] = [];

  constructor() {
    this.configurationBasic = ConfigurationBasicService.config;
    this.configurationAdvanced = ConfigurationAdvancedService.config;
    this.data = data;
  }

  ngOnInit() {
  }

}
